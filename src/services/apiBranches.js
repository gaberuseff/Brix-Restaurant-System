import supabase from "./supabase";

export async function getBranches() {
  const {data, error} = await supabase
    .from("branches")
    .select("*")
    .or("status.neq.deleted,status.is.null");

  if (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }

  return data;
}

export async function deleteBranch(id) {
  console.log("Deleting branch:", id);
  const {data, error} = await supabase
    .from("branches")
    .update({status: "deleted"})
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error deleting branch:", error);
    throw error;
  }

  return data;
}

export async function createBranch(newBranch) {
  const {data, error} = await supabase
    .from("branches")
    .insert([newBranch])
    .select();

  if (error) {
    console.error("Error creating branch:", error);
    throw error;
  }

  return data;
}

export async function updateBranch({id, ...updatedBranch}) {
  const {data, error} = await supabase
    .from("branches")
    .update(updatedBranch)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating branch:", error);
    throw error;
  }

  return data;
}
