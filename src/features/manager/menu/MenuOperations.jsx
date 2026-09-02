import Filter from "../../../ui/Filter";
import useCategoriesShortData from "../categories/useCategoriesShortData";

function MenuOperations() {
  const {categoriesShort = []} = useCategoriesShortData();

  const categoryOptions = [
    {value: "all", label: "All Categories"},
    ...categoriesShort.map((category) => {
      return {value: category.slug, label: category.name_en};
    }),
  ];

  return (
    <div className="flex items-center gap-4">
      <Filter filterField="category" options={categoryOptions} />
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
