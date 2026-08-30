import Filter from "../../ui/Filter";
import useCategories from "../categories/useCategories";

function MenuOperations() {
  const {categories = []} = useCategories();

  const options = [
    {value: "all", label: "All Categories"},
    ...categories.map((category) => {
      return {value: category.slug, label: category.name};
    }),
  ];

  return (
    <div className="flex items-center gap-4">
      <Filter filterField="category" options={options} />
      <Filter
        filterField="is_available"
        options={[
          {value: "all", label: "All Availability"},
          {value: "true", label: "Available"},
          {value: "false", label: "Not Available"},
        ]}
      />
    </div>
  );
}

export default MenuOperations;
