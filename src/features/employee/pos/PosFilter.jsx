import {Card, Tabs} from "@heroui/react";
import {useSearchParams} from "react-router-dom";
import usePosCategories from "./usePosCategories";

function PosFilter() {
  const {categories} = usePosCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";

  function handleSelectionChange(key) {
    if (key === null || key === undefined) return;
    const selectedValue = String(key);

    if (selectedValue === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", selectedValue);
    }

    setSearchParams(searchParams);
  }

  return (
    <Card className="w-full h-full overflow-y-auto no-scrollbar">
      <Tabs
        orientation="vertical"
        variant="secondary"
        className="w-full h-full"
        selectedKey={currentCategory}
        onSelectionChange={handleSelectionChange}>
        <Tabs.ListContainer className="w-full">
          <Tabs.List aria-label="Categories" className="w-full gap-1">
            <Tabs.Tab
              key="all"
              id="all"
              className="min-h-14 h-auto py-2 w-full justify-start text-start whitespace-normal break-words shrink-0">
              <span className="whitespace-normal break-words break-all text-start w-full">
                All
              </span>
              <Tabs.Indicator />
            </Tabs.Tab>

            {categories.map((category) => {
              const categorySlug = category.slug || String(category.id);
              return (
                <Tabs.Tab
                  key={category.id}
                  id={categorySlug}
                  className="min-h-14 h-auto py-2 w-full justify-start text-start whitespace-normal break-words shrink-0">
                  <span className="whitespace-normal break-words break-all text-start w-full">
                    {category.name_en || category.name_ar}
                  </span>
                  <Tabs.Indicator />
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </Card>
  );
}

export default PosFilter;
