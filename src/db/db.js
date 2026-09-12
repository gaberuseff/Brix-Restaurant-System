import Dexie from "dexie";

class RestaurantDatabase extends Dexie {
  constructor() {
    super("restaurant-db");

    this.version(1).stores({
      branches: "id",

      categories: "id",

      menu: "id, category_id",

      modifier_groups: "id",

      modifiers: "id, modifier_group_id",

      product_modifier_groups: "id, product_id, modifier_group_id",

      product_variants: "id, product_id",

      settings: "id",
    });
  }
}

export const db = new RestaurantDatabase();
