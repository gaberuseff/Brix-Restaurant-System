import supabase from "./supabase";
import {db} from "../db/db";

export async function syncInitialData() {
  try {
    // 1. Get current logged-in user and determine their branch_id
    const {
      data: {session},
    } = await supabase.auth.getSession();
    const currentUser = session?.user;

    let userBranchId = currentUser?.user_metadata?.branch_id;

    if (!userBranchId && currentUser?.id) {
      const {data: profile} = await supabase
        .from("profiles")
        .select("branch_id")
        .eq("id", currentUser.id)
        .maybeSingle();

      userBranchId = profile?.branch_id;
    }

    // 2. Optimized table fetches (excluding created_at, name_ar, image_url, etc.)
    const fetchBranches = async () => {
      let query = supabase
        .from("branches")
        .select(
          "id, name, address, phone, location, opening_time, closing_time, status,is_accepting_orders, is_dine_in_enabled, is_takeaway_enabled, is_delivery_enabled",
        );

      if (userBranchId) {
        query = query.eq("id", userBranchId);
      }

      const {data, error} = await query;
      if (error) {
        console.error("Error fetching branches:", error);
        throw error;
      }
      return data ?? [];
    };

    const fetchCategories = async () => {
      const {data, error} = await supabase
        .from("categories")
        .select("id, name_en, slug, description_en")
        .eq("is_active", true);

      if (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
      return data ?? [];
    };

    const fetchMenu = async () => {
      const {data, error} = await supabase
        .from("menu")
        .select("id, category_id, name_en, description_en")
        .eq("is_available", true);

      if (error) {
        console.error("Error fetching menu:", error);
        throw error;
      }
      return data ?? [];
    };

    const fetchModifierGroups = async () => {
      const {data, error} = await supabase
        .from("modifier_groups")
        .select("id, name_en, min_selections, max_selections");

      if (error) {
        console.error("Error fetching modifier_groups:", error);
        throw error;
      }
      return data ?? [];
    };

    const fetchModifiers = async () => {
      const {data, error} = await supabase
        .from("modifiers")
        .select("id, modifier_group_id, name_en, price");

      if (error) {
        console.error("Error fetching modifiers:", error);
        throw error;
      }
      return data ?? [];
    };

    const fetchProductModifierGroups = async () => {
      const {data, error} = await supabase
        .from("product_modifier_groups")
        .select("id, product_id, modifier_group_id");

      if (error) {
        console.error("Error fetching product_modifier_groups:", error);
        throw error;
      }
      return data ?? [];
    };

    const fetchProductVariants = async () => {
      const {data, error} = await supabase
        .from("product_variants")
        .select("id, product_id, name_en, price, sort_order");

      if (error) {
        console.error("Error fetching product_variants:", error);
        throw error;
      }
      return data ?? [];
    };

    const fetchSettings = async () => {
      const {data, error} = await supabase
        .from("settings")
        .select("id, delivery_fee, dine_in_tax");

      if (error) {
        console.error("Error fetching settings:", error);
        throw error;
      }
      return data ?? [];
    };

    // 3. Fetch all in parallel
    const [
      branches,
      categories,
      menu,
      modifierGroups,
      modifiers,
      productModifierGroups,
      productVariants,
      settings,
    ] = await Promise.all([
      fetchBranches(),
      fetchCategories(),
      fetchMenu(),
      fetchModifierGroups(),
      fetchModifiers(),
      fetchProductModifierGroups(),
      fetchProductVariants(),
      fetchSettings(),
    ]);

    // 4. Save optimized data locally into Dexie
    await db.transaction(
      "rw",
      [
        db.branches,
        db.categories,
        db.menu,
        db.modifier_groups,
        db.modifiers,
        db.product_modifier_groups,
        db.product_variants,
        db.settings,
      ],
      async () => {
        await db.branches.clear();
        if (branches.length) await db.branches.bulkPut(branches);

        await db.categories.clear();
        if (categories.length) await db.categories.bulkPut(categories);

        await db.menu.clear();
        if (menu.length) await db.menu.bulkPut(menu);

        await db.modifier_groups.clear();
        if (modifierGroups.length)
          await db.modifier_groups.bulkPut(modifierGroups);

        await db.modifiers.clear();
        if (modifiers.length) await db.modifiers.bulkPut(modifiers);

        await db.product_modifier_groups.clear();
        if (productModifierGroups.length)
          await db.product_modifier_groups.bulkPut(productModifierGroups);

        await db.product_variants.clear();
        if (productVariants.length)
          await db.product_variants.bulkPut(productVariants);

        await db.settings.clear();
        if (settings.length) await db.settings.bulkPut(settings);
      },
    );

    return {
      branches,
      categories,
      menu,
      modifierGroups,
      modifiers,
      productModifierGroups,
      productVariants,
      settings,
    };
  } catch (error) {
    console.error("Error syncing initial data:", error);
    throw error;
  }
}
