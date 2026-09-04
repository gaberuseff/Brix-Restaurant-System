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
import TableSkeleton from "../../../ui/TableSkeleton";
import ModifireGroupsModel from "./ModifireGroupsModel";
import useDeleteModifireGroup from "./useDeleteModifierGroup";
import useModifireGroups from "./useModifireGroups";

const columns = [
  {key: "name_en", label: "Name (EN)", isRowHeader: true},
  {key: "name_ar", label: "Name (AR)", isRowHeader: false},
  {key: "min_selections", label: "Min Selections", isRowHeader: false},
  {key: "max_selections", label: "Max Selections", isRowHeader: false},
  {key: "actions", label: "Actions", isRowHeader: false},
];

function ModifireGroupsTable() {
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [groupToEdit, setGroupToEdit] = useState(null);

  const {modifierGroups = [], isModifierGroupsPending} = useModifireGroups();
  const {deleteGroup, isDeleting} = useDeleteModifireGroup();

  if (isModifierGroupsPending)
    return <TableSkeleton cols={columns} rowsCount={4} />;

  if (!modifierGroups || modifierGroups.length === 0)
    return (
      <EmptyTable
        message="No modifier groups found"
        Icon={Layers01Icon}
        cols={columns}
      />
    );

  const handleDelete = () => {
    if (!groupToDelete) return;
    deleteGroup(groupToDelete.id, {
      onSuccess: () => {
        setGroupToDelete(null);
      },
    });
  };

  return (
    <>
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Modifier Groups Table"
            className="min-w-[600px]">
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
              {modifierGroups.map((group) => (
                <Table.Row key={group.id}>
                  <Table.Cell>{group.name_en || "-"}</Table.Cell>
                  <Table.Cell>{group.name_ar || "-"}</Table.Cell>
                  <Table.Cell>{group.min_selections ?? 0}</Table.Cell>
                  <Table.Cell>{group.max_selections ?? 1}</Table.Cell>
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
                            onPress={() => setGroupToEdit(group)}
                            id="edit"
                            textValue="Edit">
                            <div className="flex items-center gap-2">
                              <HugeiconsIcon icon={Edit02Icon} size={16} />
                              <span>Edit</span>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onPress={() => setGroupToDelete(group)}
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

      {Boolean(groupToEdit) && (
        <ModifireGroupsModel
          groupToEdit={groupToEdit}
          isOpen={Boolean(groupToEdit)}
          onOpenChange={(open) => !open && setGroupToEdit(null)}
        />
      )}

      <ConfirmDeleteModel
        open={Boolean(groupToDelete)}
        setOpen={(open) => !open && setGroupToDelete(null)}
        handleDelete={handleDelete}
        isPending={isDeleting}
        id={groupToDelete?.id}
        name={groupToDelete?.name_en}
      />
    </>
  );
}

export default ModifireGroupsTable;
