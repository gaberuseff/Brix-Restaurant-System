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

export async function deleteMenuImage(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") return;

  try {
    const bucketPathSegment = "/menu-images/";
    const index = imageUrl.indexOf(bucketPathSegment);
    if (index === -1) return;

    const filePath = decodeURIComponent(
      imageUrl.substring(index + bucketPathSegment.length)
    );
    if (!filePath) return;

    const {error} = await supabase.storage
      .from("menu-images")
      .remove([filePath]);

    if (error) {
      console.error("Error deleting old menu image:", error);
    }
  } catch (err) {
    console.error("Failed to delete old menu image:", err);
  }
}
