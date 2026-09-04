import {Button, Dropdown, Table} from "@heroui/react";
import {
  Delete,
  Edit02Icon,
  Layers01Icon,
  MoreVerticalCircle01Icon,
} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useState} from "react";
import ConfirmDeleteModel from "../../../ui/ConfirmDeleteModel";
import EmptyTable from "../../../ui/EmptyTable";
import Pagination from "../../../ui/Pagination";
import TableSkeleton from "../../../ui/TableSkeleton";
import ModifireModel from "./ModifireModel";
import useDeleteModifireGroup from "./useDeleteModifierGroup";
import useModifires from "./useModifires";

const columns = [
  {key: "name_en", label: "Name (EN)", isRowHeader: true},
  {key: "name_ar", label: "Name (AR)", isRowHeader: false},
  {key: "price", label: "Price", isRowHeader: false},
  {key: "group", label: "Group", isRowHeader: false},
  {key: "actions", label: "Actions", isRowHeader: false},
];

function ModifiresTable() {
  const [modifierToDelete, setModifierToDelete] = useState(null);
  const [modifierToEdit, setModifierToEdit] = useState(null);

  const {modifiers = [], count, isModifiersPending} = useModifires();
  const {deleteGroup, isDeleting} = useDeleteModifireGroup();

  if (isModifiersPending) return <TableSkeleton cols={columns} rowsCount={4} />;

  if (!modifiers || modifiers.length === 0)
    return (
      <EmptyTable
        message="No modifiers found"
        Icon={Layers01Icon}
        cols={columns}
      />
    );

  const handleDelete = () => {
    if (!modifierToDelete) return;
    deleteGroup(modifierToDelete.id, {
      onSuccess: () => {
        setModifierToDelete(null);
      },
    });
  };

  return (
    <div className="space-y-4">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Modifiers Table" className="min-w-[600px]">
            <Table.Header>
              {columns.map((column) => (
                <Table.Column
                  key={column.key}
                  id={column.key}
                  isRowHeader={column.isRowHeader}>
                  {column.label}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body>
              {modifiers.map((modifier) => (
                <Table.Row key={modifier.id}>
                  <Table.Cell>{modifier.name_en || "-"}</Table.Cell>
                  <Table.Cell>{modifier.name_ar || "-"}</Table.Cell>
                  <Table.Cell>{modifier.price || "-"}</Table.Cell>
                  <Table.Cell className="text-accent font-semibold">
                    {modifier.modifier_groups?.name_en || "-"}
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
                            onPress={() => setModifierToEdit(modifier)}
                            id="edit"
                            textValue="Edit">
                            <div className="flex items-center gap-2">
                              <HugeiconsIcon icon={Edit02Icon} size={16} />
                              <span>Edit</span>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onPress={() => setModifierToDelete(modifier)}
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

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>

      {Boolean(modifierToEdit) && (
        <ModifireModel
          modifierToEdit={modifierToEdit}
          isOpen={Boolean(modifierToEdit)}
          onOpenChange={(open) => !open && setModifierToEdit(null)}
        />
      )}

      <ConfirmDeleteModel
        open={Boolean(modifierToDelete)}
        setOpen={(open) => !open && setModifierToDelete(null)}
        handleDelete={handleDelete}
        isPending={isDeleting}
        id={modifierToDelete?.id}
        name={modifierToDelete?.name_en}
      />
    </div>
  );
}

export default ModifiresTable;
