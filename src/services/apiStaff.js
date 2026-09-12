import supabase from "./supabase";

export async function getStaff() {
  const {data, error} = await supabase
    .from("profiles")
    .select("*, branch_id(name,id)")
    .or("role.eq.employee,role.eq.manager");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function blockUser(userId) {
  const {data, error} = await supabase.functions.invoke("manage-user", {
    body: {action: "block", userId},
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}

export async function unblockUser(userId) {
  const {data, error} = await supabase.functions.invoke("manage-user", {
    body: {action: "unblock", userId},
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}

export async function deleteUser(userId) {
  const {data, error} = await supabase.functions.invoke("manage-user", {
    body: {action: "delete", userId},
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}
