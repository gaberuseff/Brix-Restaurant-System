import supabase from "./supabase";

export async function getSettings() {
  const {data, error} = await supabase.from("settings").select("*");

  if (error) throw new Error(error.message);

  return Array.isArray(data) ? data[0] || {} : data || {};
}

export async function updateSettings(newSettings) {
  const {id, ...updates} = newSettings;

  let query = supabase.from("settings").update(updates);

  if (id) {
    query = query.eq("id", id);
  } else {
    const {data: existing} = await supabase
      .from("settings")
      .select("id")
      .limit(1);

    if (existing && existing.length > 0) {
      query = query.eq("id", existing[0].id);
    }
  }

  const {data, error} = await query.select().single();

  if (error) throw new Error(error.message);

  return data;
}
