import {PAGE_SIZE} from "../utils/constants";
import supabase from "./supabase";

export async function createModifierGroup(data) {
  const {error} = await supabase.from("modifier_groups").insert(data);

  if (error) throw new Error(error.message);

  return true;
}

export async function getModifierGroups() {
  const {data, error} = await supabase
    .from("modifier_groups")
    .select("*")
    .order("created_at", {ascending: false});

  if (error) throw new Error(error.message);

  return data;
}

export async function createModifier(data) {
  const {error} = await supabase.from("modifiers").insert(data);

  if (error) throw new Error(error.message);

  return true;
}

export async function getModifiers(page) {
  let query = supabase
    .from("modifiers")
    .select("*, modifier_groups(name_en)", {count: "exact"});

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const {data, count, error} = await query.order("created_at", {
    ascending: false,
  });

  if (error) throw new Error(error.message);

  return {data, count};
}

export async function deleteModifierGroup(id) {
  const {error} = await supabase.from("modifier_groups").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return true;
}

export async function updateModifierGroup({id, ...updates}) {
  const {data, error} = await supabase
    .from("modifier_groups")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateModifier({id, ...updates}) {
  const {data, error} = await supabase
    .from("modifiers")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

