import {Button, Dropdown, Spinner, Table} from "@heroui/react";
import {
  Delete,
  Edit02Icon,
  Hamburger01Icon,
  MoreVerticalCircle01Icon,
} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useState} from "react";
import {useParams} from "react-router-dom";
import ConfirmDeleteModel from "../../../ui/ConfirmDeleteModel";
import EmptyTable from "../../../ui/EmptyTable";
import ErrorState from "../../../ui/ErrorState";
import TableSkeleton from "../../../ui/TableSkeleton";
import MenuItemVariantModel from "./MenuItemVariantModel";
import useDeleteItemVariant from "./useDeleteItemVariant";
import useItemVariants from "./useItemVariants";

const tableCols = [
  {key: "name_en", label: "Name (English)", isRowHeader: true},
  {key: "name_ar", label: "Name (Arabic)", isRowHeader: false},
  {key: "price", label: "Price", isRowHeader: false},
  {key: "is_available", label: "Available", isRowHeader: false},
  {key: "sort_order", label: "Sort Order", isRowHeader: false},
  {key: "actions", label: "Actions", isRowHeader: false},
];

function MenuItemVariants() {
  const {id} = useParams();
  const [variantToDelete, setVariantToDelete] = useState(null);
  const [variantToEdit, setVariantToEdit] = useState(null);
  const {variants, isVariantsLoading, isVariantsError} = useItemVariants(id);
  const {deleteMenuItemVariant, isDeleting} = useDeleteItemVariant();

  const handleDelete = () => {
    if (!variantToDelete) return;
    deleteMenuItemVariant(variantToDelete.id, {
      onSuccess: () => {
        setVariantToDelete(null);
      },
    });
  };

  if (isVariantsLoading) return <TableSkeleton cols={tableCols} rowsCount={4} />;

  if (isVariantsError || !variants) {
    return (
      <div className="space-y-6">
        <ErrorState
          title="Variants Not Found"
          message="The requested variants do not exist or the ID is invalid."
        />
      </div>
    );
  }

  if (variants.length === 0)
    return (
      <EmptyTable
        message="No variants found"
        Icon={Hamburger01Icon}
        cols={tableCols}
      />
    );

  return (
    <>
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Product variants"
            className="min-w-[600px]">
            <Table.Header>
              {tableCols.map((col) => (
                <Table.Column key={col.key} isRowHeader={col.isRowHeader}>
                  {col.label}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body>
              {variants.map((variant) => (
                <Table.Row key={variant.id}>
                  <Table.Cell>{variant.name_en}</Table.Cell>
                  <Table.Cell>{variant.name_ar}</Table.Cell>
                  <Table.Cell>{variant.price}</Table.Cell>
                  <Table.Cell>{variant.is_available ? "Yes" : "No"}</Table.Cell>
                  <Table.Cell>{variant.sort_order}</Table.Cell>
                  <Table.Cell>
                    <Dropdown>
                      <Dropdown.Trigger>
                        <Button
                          isIconOnly
                          variant="secondary"
                          size="sm"
                          aria-label="Actions">
                          <HugeiconsIcon icon={MoreVerticalCircle01Icon} />
                        </Button>
                      </Dropdown.Trigger>
                      <Dropdown.Popover>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onPress={() => setVariantToEdit(variant)}
                            id="edit"
                            textValue="Edit">
                            <div className="flex items-center gap-2">
                              <HugeiconsIcon icon={Edit02Icon} size={16} />
                              <span>Edit</span>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onPress={() => setVariantToDelete(variant)}
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

      {Boolean(variantToEdit) && (
        <MenuItemVariantModel
          variantToEdit={variantToEdit}
          isOpen={Boolean(variantToEdit)}
          onOpenChange={(open) => !open && setVariantToEdit(null)}
        />
      )}

      <ConfirmDeleteModel
        open={Boolean(variantToDelete)}
        setOpen={(open) => !open && setVariantToDelete(null)}
        handleDelete={handleDelete}
        isPending={isDeleting}
        id={variantToDelete?.id}
        name={variantToDelete?.name_en}
      />
    </>
  );
}

export default MenuItemVariants;
