import {db} from "../db/db";

export const categoryRepository = {
  getAll() {
    return db.categories.toArray();
  },
};
