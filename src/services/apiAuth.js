import supabase, {supabaseAdmin} from "./supabase";

export async function createAccount(userData) {
  const {name, email, phone, password, role = "manager"} = userData;

  const {data, error} = await supabaseAdmin.auth.admin.createUser({
    email,
    password,

    user_metadata: {
      full_name: name,
      phone,
      role,
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
  const {data: session} = await supabase.auth.getSession();

  if (!session?.session) return null;

  const {
    data: {user},
  } = await supabase.auth.getUser();

  return user;
}

export async function logout() {
  const {error} = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
