import supabase from "./supabase";

export async function getMenuItem(id) {
  const {data, error} = await supabase
    .from("menu")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Failed to fetch menu item");

  return data;
}

export async function updateMenuItem(menuItemId, updates) {
  const {data, error} = await supabase
    .from("menu")
    .update(updates)
    .eq("id", menuItemId)
    .select()
    .single();

  if (error) throw new Error("Failed to update menu item");

  return data;
}

export async function getMenuItemVariants(productId) {
  const {data, error} = await supabase
    .from("product_variants")
    .select("id, name_en, name_ar, price, is_available, sort_order")
    .eq("product_id", productId)
    .order("sort_order", {ascending: true});

  if (error) throw new Error("Failed to fetch product variants");

  return data;
}

export async function createMenuItemVariant(variant) {
  const {data, error} = await supabase
    .from("product_variants")
    .insert([variant])
    .select()
    .single();

  if (error) throw new Error("Failed to create product variant");

  return data;
}

export async function updateMenuItemVariant({id, ...updates}) {
  const {data, error} = await supabase
    .from("product_variants")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Failed to update product variant");

  return data;
}

export async function deleteMenuItemVariant(id) {
  const {data, error} = await supabase
    .from("product_variants")
    .delete()
    .eq("id", id);

  if (error) throw new Error("Failed to delete product variant");

  return data;
}
