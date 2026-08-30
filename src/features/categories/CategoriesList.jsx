import {Package01Icon} from "@hugeicons/core-free-icons";
import EmpryState from "../../ui/EmpryState";
import ErrorState from "../../ui/ErrorState";
import CategoriesSkeleton from "./CategoriesSkeleton";
import CategoryItem from "./CategoryItem";
import useCategories from "./useCategories";

function CategoriesList() {
  const {isLoading, error, categories, refetch} = useCategories();

  if (isLoading) return <CategoriesSkeleton count={6} />;

  if (error)
    return (
      <ErrorState
        message={error.message || "Failed to fetch categories."}
        onRetry={refetch}
      />
    );

  if (!categories || categories.length === 0)
    return (
      <EmpryState
        icon={Package01Icon}
        title="No Categories Found"
        description="Add your first category to get started"
      />
    );

  return (
    <ul className="grid grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </ul>
  );
}

export default CategoriesList;
