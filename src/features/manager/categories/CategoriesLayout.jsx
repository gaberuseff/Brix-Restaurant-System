import CategoriesList from "./CategoriesList";
import CategoryDrawer from "./CategoryDrawer";

function CategoriesLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl">Categories</h1>
        <CategoryDrawer />
      </div>

      <div>
        <CategoriesList />
      </div>
    </div>
  );
}

export default CategoriesLayout;
