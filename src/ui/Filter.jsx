import {ListBox, Select} from "@heroui/react";
import {useSearchParams} from "react-router-dom";

function Filter({filterField, options = []}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    searchParams.get(filterField) || options[0]?.value || "all";

  function handleSelectionChange(key) {
    if (key === null || key === undefined) return;
    const value =
      typeof key === "object" && key !== null && key.values
        ? String(Array.from(key)[0])
        : String(key);

    if (value === "all") {
      searchParams.delete(filterField);
    } else {
      searchParams.set(filterField, value);
    }
    setSearchParams(searchParams);
  }

  return (
    <Select
      className="w-52"
      variant="secondary"
      aria-label={`Filter by ${filterField}`}
      placeholder={`Filter by ${filterField}`}
      selectedKey={String(currentFilter)}
      onSelectionChange={handleSelectionChange}>
      <Select.Trigger className="w-full">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              key={option.value}
              id={String(option.value)}
              textValue={option.label}>
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

export default Filter;
