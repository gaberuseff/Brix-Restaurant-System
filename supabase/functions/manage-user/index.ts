import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {createClient} from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {headers: corsHeaders});
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Missing Supabase environment variables.");
    }

    // Initialize admin client with Service Role Key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Verify caller authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({error: "Missing Authorization header"}),
        {
          status: 401,
          headers: {...corsHeaders, "Content-Type": "application/json"},
        },
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: {user: callerUser},
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !callerUser) {
      return new Response(
        JSON.stringify({error: "Unauthorized: Invalid token"}),
        {
          status: 401,
          headers: {...corsHeaders, "Content-Type": "application/json"},
        },
      );
    }

    // Parse request body
    const body = await req.json();
    const {action, userId} = body;

    if (!userId) {
      return new Response(JSON.stringify({error: "userId is required"}), {
        status: 400,
        headers: {...corsHeaders, "Content-Type": "application/json"},
      });
    }

    if (!["block", "unblock", "delete"].includes(action)) {
      return new Response(
        JSON.stringify({
          error:
            "Invalid action. Supported actions: 'block', 'unblock', 'delete'",
        }),
        {
          status: 400,
          headers: {...corsHeaders, "Content-Type": "application/json"},
        },
      );
    }

    // Prevent user from blocking or deleting themselves
    if (callerUser.id === userId) {
      return new Response(
        JSON.stringify({
          error: "You cannot perform this action on your own account",
        }),
        {
          status: 400,
          headers: {...corsHeaders, "Content-Type": "application/json"},
        },
      );
    }

    let result = {};

    switch (action) {
      case "block": {
        // 1. Ban user in Supabase Auth (e.g. 100 years ban duration)
        const {error: banError} = await supabaseAdmin.auth.admin.updateUserById(
          userId,
          {
            ban_duration: "876000h",
          },
        );

        if (banError) {
          throw new Error(`Auth block error: ${banError.message}`);
        }

        // 2. Update status in profiles table
        const {error: profileError} = await supabaseAdmin
          .from("profiles")
          .update({status: "inactive"})
          .eq("id", userId);

        if (profileError) {
          throw new Error(`Profile update error: ${profileError.message}`);
        }

        result = {
          success: true,
          message: "User blocked successfully",
          status: "inactive",
        };
        break;
      }

      case "unblock": {
        // 1. Remove ban duration in Supabase Auth
        const {error: unbanError} =
          await supabaseAdmin.auth.admin.updateUserById(userId, {
            ban_duration: "none",
          });

        if (unbanError) {
          throw new Error(`Auth unblock error: ${unbanError.message}`);
        }

        // 2. Update status in profiles table
        const {error: profileError} = await supabaseAdmin
          .from("profiles")
          .update({status: "active"})
          .eq("id", userId);

        if (profileError) {
          throw new Error(`Profile update error: ${profileError.message}`);
        }

        result = {
          success: true,
          message: "User unblocked successfully",
          status: "active",
        };
        break;
      }

      case "delete": {
        // 1. Delete from profiles table
        const {error: profileDeleteError} = await supabaseAdmin
          .from("profiles")
          .delete()
          .eq("id", userId);

        if (profileDeleteError) {
          throw new Error(
            `Profile delete error: ${profileDeleteError.message}`,
          );
        }

        // 2. Delete user from Supabase Auth
        const {error: authDeleteError} =
          await supabaseAdmin.auth.admin.deleteUser(userId);

        if (authDeleteError) {
          throw new Error(`Auth delete error: ${authDeleteError.message}`);
        }

        result = {
          success: true,
          message: "User deleted completely from Auth and Profiles",
        };
        break;
      }
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {...corsHeaders, "Content-Type": "application/json"},
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({error: error?.message || "Internal server error"}),
      {
        status: 500,
        headers: {...corsHeaders, "Content-Type": "application/json"},
      },
    );
  }
});
