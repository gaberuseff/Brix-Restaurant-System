import Heading from "../../../ui/Heading.jsx";
import CategoriesTable from "./CategoriesTable.jsx";
import CategoryDrawer from "./CategoryDrawer";

function CategoriesLayout() {
  return (
    <div className="space-y-6">
      <Heading as="h1">Categories</Heading>

      <div className="flex flex-col gap-4">
        <CategoryDrawer />
        <CategoriesTable />
      </div>
    </div>
  );
}

export default CategoriesLayout;
