import {Button, Chip, Dropdown, Table} from "@heroui/react";
import {
  Delete,
  Edit02Icon,
  MoreVerticalCircle01Icon,
  Package01Icon,
} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useState} from "react";
import ConfirmDeleteModel from "../../../ui/ConfirmDeleteModel";
import EmptyTable from "../../../ui/EmptyTable";
import ErrorState from "../../../ui/ErrorState";
import TableSkeleton from "../../../ui/TableSkeleton";
import CategoryDrawer from "./CategoryDrawer";
import useCategories from "./useCategories";
import useDeleteCategory from "./useDeleteCategory";

const tableCols = [
  {key: "name_en", label: "Name (English)", isRowHeader: true},
  {key: "name_ar", label: "Name (Arabic)", isRowHeader: false},
  {key: "slug", label: "Slug", isRowHeader: false},
  {key: "description_en", label: "Description", isRowHeader: false},
  {key: "is_active", label: "Status", isRowHeader: false},
  {key: "actions", label: "Actions", isRowHeader: false},
];

function CategoriesTable() {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const {isLoading, error, categories, refetch} = useCategories();
  const {deleteCategory, isDeleting} = useDeleteCategory();

  const handleDelete = () => {
    if (!categoryToDelete) return;
    deleteCategory(categoryToDelete.id, {
      onSuccess: () => {
        setCategoryToDelete(null);
      },
    });
  };

  if (isLoading) return <TableSkeleton cols={tableCols} rowsCount={4} />;

  if (error)
    return (
      <ErrorState
        message={error.message || "Failed to fetch categories."}
        onRetry={refetch}
      />
    );

  if (!categories || categories.length === 0)
    return (
      <EmptyTable
        message="No categories found"
        Icon={Package01Icon}
        cols={tableCols}
      />
    );

  return (
    <>
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Categories table"
            className="min-w-[600px]">
            <Table.Header>
              {tableCols.map((col) => (
                <Table.Column key={col.key} isRowHeader={col.isRowHeader}>
                  {col.label}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body>
              {categories.map((category) => (
                <Table.Row key={category.id}>
                  <Table.Cell>{category.name_en}</Table.Cell>
                  <Table.Cell>{category.name_ar}</Table.Cell>
                  <Table.Cell>{category.slug}</Table.Cell>
                  <Table.Cell>
                    {category.description_en || "No description provided."}
                  </Table.Cell>
                  <Table.Cell>
                    <Chip
                      size="sm"
                      color={category.is_active ? "accent" : "danger"}
                      variant="flat"
                      className="capitalize shrink-0">
                      {category.is_active ? "Active" : "Inactive"}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown>
                      <Dropdown.Trigger
                        isIconOnly
                        variant="secondary"
                        size="sm"
                        aria-label="Actions">
                        <Button isIconOnly variant="secondary" size="sm">
                          <HugeiconsIcon icon={MoreVerticalCircle01Icon} />
                        </Button>
                      </Dropdown.Trigger>
                      <Dropdown.Popover>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onPress={() => setCategoryToEdit(category)}
                            id="edit"
                            textValue="Edit">
                            <div className="flex items-center gap-2">
                              <HugeiconsIcon icon={Edit02Icon} size={16} />
                              <span>Edit</span>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onPress={() => setCategoryToDelete(category)}
                            id="delete"
                            textValue="Delete"
                            className="text-danger">
                            <div className="flex items-center gap-2 text-danger">
                              <HugeiconsIcon icon={Delete} size={16} />
                              <span>Delete</span>
                            </div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {Boolean(categoryToEdit) && (
        <CategoryDrawer
          categoryToEdit={categoryToEdit}
          isOpen={Boolean(categoryToEdit)}
          onOpenChange={(open) => !open && setCategoryToEdit(null)}
        />
      )}

      <ConfirmDeleteModel
        open={Boolean(categoryToDelete)}
        setOpen={(open) => !open && setCategoryToDelete(null)}
        handleDelete={handleDelete}
        isPending={isDeleting}
        id={categoryToDelete?.id}
        name={categoryToDelete?.name_en}
      />
    </>
  );
}

export default CategoriesTable;
