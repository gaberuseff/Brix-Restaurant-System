import supabase from "./supabase";
import {uploadMenuImage, deleteMenuImage} from "./apiStorage";

export async function getMenuItem(id) {
  const {data, error} = await supabase
    .from("menu")
    .select(
      `
    *,
    product_variants (
      *
    ),
    product_modifier_groups (
      id,
      product_id,
      modifier_group_id,
      modifier_groups (
        *,
        modifiers (
          *
        )
      )
    )
  `,
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateMenuItem(menuItemIdOrObject, updatesData) {
  let menuItemId;
  let updates;

  if (typeof menuItemIdOrObject === "object" && menuItemIdOrObject !== null) {
    const {id, ...rest} = menuItemIdOrObject;
    menuItemId = id;
    updates = updatesData ? {...rest, ...updatesData} : rest;
  } else {
    menuItemId = menuItemIdOrObject;
    updates = updatesData || {};
  }

  let finalUpdates = {...updates};

  if (updates.image instanceof File) {
    const oldUrl = updates.old_image_url || updates.image_url;
    if (oldUrl) {
      await deleteMenuImage(oldUrl);
    }
    const newImageUrl = await uploadMenuImage(updates.image);
    finalUpdates.image_url = newImageUrl;
    delete finalUpdates.image;
    delete finalUpdates.old_image_url;
  }

  const {data, error} = await supabase
    .from("menu")
    .update(finalUpdates)
    .eq("id", menuItemId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getMenuItemVariants(productId) {
  const {data, error} = await supabase
    .from("product_variants")
    .select("id, name_en, name_ar, price, sort_order")
    .eq("product_id", productId)
    .order("sort_order", {ascending: true});

  if (error) throw new Error(error.message);

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

  if (error) throw new Error(error.message);

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

export async function connectModifierGroup({product_id, modifier_group_id}) {
  const {data, error} = await supabase
    .from("product_modifier_groups")
    .insert([{product_id, modifier_group_id}])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function disconnectModifierGroup({
  connectionId,
  product_id,
  modifier_group_id,
}) {
  let query = supabase.from("product_modifier_groups").delete();

  if (connectionId) {
    query = query.eq("id", connectionId);
  } else if (product_id && modifier_group_id) {
    query = query
      .eq("product_id", product_id)
      .eq("modifier_group_id", modifier_group_id);
  }

  const {data, error} = await query;

  if (error) throw new Error(error.message);

  return data;
}

export async function updateConnectedModifierGroup({
  connectionId,
  product_id,
  old_modifier_group_id,
  new_modifier_group_id,
}) {
  let query = supabase
    .from("product_modifier_groups")
    .update({modifier_group_id: new_modifier_group_id});

  if (connectionId) {
    query = query.eq("id", connectionId);
  } else if (product_id && old_modifier_group_id) {
    query = query
      .eq("product_id", product_id)
      .eq("modifier_group_id", old_modifier_group_id);
  }

  const {data, error} = await query.select();

  if (error) throw new Error(error.message);

  return data;
}
