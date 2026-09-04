import {PAGE_SIZE} from "../utils/constants";
import {compressImage} from "../utils/helpers";
import supabase from "./supabase";

export async function uploadMenuImage(file) {
  if (!file) return null;

  const compressedFile = await compressImage(file);
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
  const filePath = `${fileName}`;

  const {error: uploadError} = await supabase.storage
    .from("menu-images")
    .upload(filePath, compressedFile, {
      contentType: "image/webp",
      upsert: true,
    });

  if (uploadError) {
    console.error("Error uploading menu image:", uploadError);
    throw new Error(uploadError.message || "Failed to upload image");
  }

  const {data} = supabase.storage.from("menu-images").getPublicUrl(filePath);

  return data.publicUrl;
}

export async function getMenuItems(categoryFilter, availabilityFilter, page) {
  let query = supabase
    .from("menu")
    .select(
      `
      name_en,
      description_en,
      id,
      image_url,
      is_available,
      categories!inner(name_en, slug)
      `,
      {count: "exact"},
    )
    .eq("status", "active");

  if (categoryFilter !== "all") {
    query = query.eq("categories.slug", categoryFilter);
  }

  if (availabilityFilter !== "all") {
    query = query.eq("is_available", availabilityFilter);
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const {data, count, error} = await query.order("id", {ascending: true});

  if (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }

  return {data, count};
}

export async function createMenuItem(newItem) {
  let imageUrl = newItem.image_url || "";

  if (newItem.image instanceof File) {
    imageUrl = await uploadMenuImage(newItem.image);
  }

  const {image, ...itemData} = newItem;

  const payload = {
    status: "active",
    ...itemData,
    image_url: imageUrl,
  };

  const {data, error} = await supabase.from("menu").insert([payload]).select();

  if (error) {
    console.error("Error creating menu item:", error);
    throw error;
  }

  return data;
}

export async function updateMenuItem({id, ...updatedItem}) {
  let imageUrl = updatedItem.image_url;

  if (updatedItem.image instanceof File) {
    imageUrl = await uploadMenuImage(updatedItem.image);
  }

  const {image, ...itemData} = updatedItem;

  const payload = {
    ...itemData,
    ...(imageUrl !== undefined ? {image_url: imageUrl} : {}),
  };

  const {data, error} = await supabase
    .from("menu")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }

  return data;
}

export async function deleteMenuItem(id) {
  const {data, error} = await supabase
    .from("menu")
    .update({status: "deleted"})
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }

  return data;
}
