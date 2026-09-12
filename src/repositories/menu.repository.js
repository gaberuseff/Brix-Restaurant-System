import {db} from "../db/db";

export const menuRepository = {
  async getAll(categoryFilter) {
    let items;

    if (!categoryFilter || categoryFilter === "all") {
      items = await db.menu
        .filter((item) => item.status !== "deleted")
        .toArray();
    } else {
      const category = await db.categories
        .filter(
          (cat) =>
            cat.slug === categoryFilter ||
            String(cat.id) === String(categoryFilter),
        )
        .first();

      if (!category) return [];

      items = await db.menu
        .where("category_id")
        .equals(category.id)
        .filter((item) => item.status !== "deleted")
        .toArray();
    }

    if (!items.length) return [];

    const productIds = Array.from(
      new Set(
        items
          .flatMap((item) => [item.id, String(item.id), Number(item.id)])
          .filter((id) => id !== null && id !== undefined && !Number.isNaN(id)),
      ),
    );

    // 1. Fetch variants and modifier connections in parallel
    const [allVariants, connections] = await Promise.all([
      db.product_variants.where("product_id").anyOf(productIds).toArray(),
      db.product_modifier_groups
        .where("product_id")
        .anyOf(productIds)
        .toArray(),
    ]);

    // Group variants by product_id
    const variantsByProduct = {};
    for (const v of allVariants) {
      const key = String(v.product_id);
      if (!variantsByProduct[key]) variantsByProduct[key] = [];
      variantsByProduct[key].push(v);
    }

    // 2. Fetch modifier groups and modifiers for the connected groups
    const groupIds = Array.from(
      new Set(
        connections
          .map((c) => c.modifier_group_id)
          .filter((id) => id !== null && id !== undefined),
      ),
    );

    let modifierGroups = [];
    let allModifiers = [];

    if (groupIds.length > 0) {
      [modifierGroups, allModifiers] = await Promise.all([
        db.modifier_groups.where("id").anyOf(groupIds).toArray(),
        db.modifiers.where("modifier_group_id").anyOf(groupIds).toArray(),
      ]);
    }

    // Group modifiers by modifier_group_id
    const modifiersByGroup = {};
    for (const mod of allModifiers) {
      if (mod.status === "deleted") continue;
      const gId = String(mod.modifier_group_id);
      if (!modifiersByGroup[gId]) modifiersByGroup[gId] = [];
      modifiersByGroup[gId].push(mod);
    }

    // Group modifier groups by product_id
    const modifierGroupsByProduct = {};
    for (const conn of connections) {
      const pId = String(conn.product_id);
      const group = modifierGroups.find(
        (g) => String(g.id) === String(conn.modifier_group_id),
      );
      if (!group) continue;

      if (!modifierGroupsByProduct[pId]) {
        modifierGroupsByProduct[pId] = [];
      }

      modifierGroupsByProduct[pId].push({
        ...group,
        connectionId: conn.id,
        modifiers: (modifiersByGroup[String(group.id)] || []).sort(
          (a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0),
        ),
      });
    }

    // 3. Return items populated with variants and modifierGroups
    return items.map((item) => {
      const pId = String(item.id);
      return {
        ...item,
        variants: (variantsByProduct[pId] || []).sort(
          (a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0),
        ),
        modifierGroups: modifierGroupsByProduct[pId] || [],
      };
    });
  },
};
