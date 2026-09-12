import supabase, {supabaseAdmin} from "./supabase";

export async function createAccount(userData) {
  const {
    name,
    full_name,
    email,
    phone,
    password,
    role = "manager",
    branch_id,
  } = userData;

  const {data, error} = await supabaseAdmin.auth.admin.createUser({
    email,
    password,

    user_metadata: {
      full_name: full_name || name,
      phone,
      role,
      ...(role === "employee" && branch_id ? {branch_id} : {}),
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({email, password}) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const {data: session, error} = await supabase.auth.getSession();

  if (error || !session?.session) return null;

  return session.session.user;
}

export async function logout() {
  const {error} = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
