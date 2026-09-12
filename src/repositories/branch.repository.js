import {db} from "../db/db";

export const branchRepository = {
  async getBranch() {
    const branch = await db.branches.toCollection().first();
    return branch || null;
  },
};
