import supabase from "./supabase";

export async function getCategories() {
  const {data, error} = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data;
}

export async function getCategoriesShort() {
  const {data, error} = await supabase.from("categories").select("id, name_en");

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data;
}

export async function createCategory(newCategory) {
  const {data, error} = await supabase
    .from("categories")
    .insert([newCategory])
    .select();

  if (error) {
    console.error("Error creating category:", error);
    throw error;
  }

  return data;
}

export async function updateCategory({id, ...updatedCategory}) {
  const {data, error} = await supabase
    .from("categories")
    .update(updatedCategory)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating category:", error);
    throw error;
  }

  return data;
}

export async function deleteCategory(id) {
  const {data, error} = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error deleting category:", error);
    throw error;
  }

  return data;
}
