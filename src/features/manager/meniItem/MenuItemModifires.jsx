import {Button, Dropdown, Table} from "@heroui/react";
import {
  ArrowDown01Icon,
  ChevronRight,
  Delete,
  Edit02Icon,
  Layers01Icon,
  MoreVerticalCircle01Icon,
} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useMemo, useState} from "react";
import ConfirmDeleteModel from "../../../ui/ConfirmDeleteModel";
import EmptyTable from "../../../ui/EmptyTable";
import MenuItemModifireGroupsModel from "./MenuItemModifireGroupsModel";
import useDisconnectModifierGroup from "./useDisconnectModifierGroup";

const tableCols = [
  {key: "name_en", label: "Group / Modifier (English)", isRowHeader: true},
  {key: "name_ar", label: "Name (Arabic)", isRowHeader: false},
  {key: "selections", label: "Min / Max Selections", isRowHeader: false},
  {key: "price", label: "Price", isRowHeader: false},
  {key: "actions", label: "Actions", isRowHeader: false},
];

function MenuItemModifires({modifierGroups = []}) {
  const [connectionToDelete, setConnectionToDelete] = useState(null);
  const [connectionToEdit, setConnectionToEdit] = useState(null);
  const {disconnectModifierGroup, isDisconnecting} =
    useDisconnectModifierGroup();

  const data = useMemo(() => {
    return (modifierGroups || []).map((item) => {
      const group = item.modifier_groups || item;
      const connectionId = item.id;
      const modifierGroupId = group.id;
      const productId = item.product_id;

      const modifiers = (group.modifiers || []).map((mod) => ({
        id: `mod-${mod.id}`,
        name_en: mod.name_en || "-",
        name_ar: mod.name_ar || "-",
        price:
          mod.price !== undefined && mod.price !== null ? `${mod.price}` : "-",
        min_selections: "-",
        max_selections: "-",
        isGroup: false,
        children: [],
      }));

      return {
        id: `group-${group.id}`,
        connectionId: connectionId,
        modifier_group_id: modifierGroupId,
        product_id: productId,
        name_en: group.name_en || "-",
        name_ar: group.name_ar || "-",
        min_selections: group.min_selections ?? 0,
        max_selections: group.max_selections ?? 0,
        price: "-",
        isGroup: true,
        children: modifiers,
      };
    });
  }, [modifierGroups]);

  const [expandedKeys, setExpandedKeys] = useState(() => new Set());

  const handleDelete = () => {
    if (!connectionToDelete) return;
    disconnectModifierGroup(
      {
        connectionId: connectionToDelete.connectionId,
        product_id: connectionToDelete.product_id,
        modifier_group_id: connectionToDelete.modifier_group_id,
      },
      {
        onSuccess: () => {
          setConnectionToDelete(null);
        },
      },
    );
  };

  if (!modifierGroups || modifierGroups.length === 0) {
    return (
      <EmptyTable
        message="No modifier groups found"
        Icon={Layers01Icon}
        cols={tableCols}
      />
    );
  }

  const renderExpandableRow = (item) => {
    return (
      <Table.Row id={item.id} textValue={item.name_en}>
        <Table.Cell textValue={item.name_en}>
          {({hasChildItems, isDisabled, isExpanded, isTreeColumn}) => (
            <span className="flex items-center gap-2">
              {hasChildItems && isTreeColumn ? (
                <Button
                  isIconOnly
                  aria-label="Toggle row"
                  isDisabled={isDisabled}
                  slot="chevron"
                  variant="ghost">
                  <HugeiconsIcon
                    icon={isExpanded ? ArrowDown01Icon : ChevronRight}
                    size={22}
                  />
                </Button>
              ) : isTreeColumn ? (
                <span className="w-6 inline-block" />
              ) : null}
              <span
                className={
                  item.isGroup
                    ? "font-semibold text-foreground"
                    : "text-default-600"
                }>
                {item.name_en}
              </span>
            </span>
          )}
        </Table.Cell>
        <Table.Cell>{item.name_ar}</Table.Cell>
        <Table.Cell>
          {item.isGroup ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-md 
                bg-default-100 px-2.5 py-1 text-xs font-medium text-default-700">
              Min: {item.min_selections} | Max: {item.max_selections}
            </span>
          ) : (
            "-"
          )}
        </Table.Cell>
        <Table.Cell>{item.isGroup ? "-" : item.price}</Table.Cell>
        <Table.Cell>
          {item.isGroup ? (
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
                    onPress={() => setConnectionToEdit(item)}
                    id="edit"
                    textValue="Edit">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={Edit02Icon} size={16} />
                      <span>Edit</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onPress={() => setConnectionToDelete(item)}
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
          ) : (
            "-"
          )}
        </Table.Cell>
        <Table.Collection items={item.children}>
          {renderExpandableRow}
        </Table.Collection>
      </Table.Row>
    );
  };

  return (
    <>
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Modifier Groups Table"
            className="min-w-[600px]"
            expandedKeys={expandedKeys}
            treeColumn="name_en"
            onExpandedChange={setExpandedKeys}>
            <Table.Header>
              {tableCols.map((col) => (
                <Table.Column
                  key={col.key}
                  isRowHeader={col.isRowHeader}
                  id={col.key}>
                  {col.label}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body items={data}>{renderExpandableRow}</Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {Boolean(connectionToEdit) && (
        <MenuItemModifireGroupsModel
          connectionToEdit={connectionToEdit}
          isOpen={Boolean(connectionToEdit)}
          onOpenChange={(open) => !open && setConnectionToEdit(null)}
        />
      )}

      <ConfirmDeleteModel
        open={Boolean(connectionToDelete)}
        setOpen={(open) => !open && setConnectionToDelete(null)}
        handleDelete={handleDelete}
        isPending={isDisconnecting}
        id={
          connectionToDelete?.connectionId ||
          connectionToDelete?.modifier_group_id
        }
        name={connectionToDelete?.name_en}
      />
    </>
  );
}

export default MenuItemModifires;
