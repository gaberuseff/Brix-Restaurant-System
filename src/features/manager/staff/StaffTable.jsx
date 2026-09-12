import {Button, Dropdown, Table} from "@heroui/react";
import {
  BlockedIcon,
  CheckmarkCircle01Icon,
  Delete,
  MoreVerticalCircle01Icon,
  WaitersIcon,
} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useState} from "react";
import ConfirmDeleteModel from "../../../ui/ConfirmDeleteModel";
import EmptyTable from "../../../ui/EmptyTable";
import TableSkeleton from "../../../ui/TableSkeleton";
import useUser from "../../auth/useUser";
import useManageStaff from "./useManageStaff";
import useStaff from "./useStaff";

const columns = [
  {
    key: "full_name",
    label: "Name",
    isRowHeader: true,
  },
  {
    key: "phone",
    label: "Phone",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "branch",
    label: "Branch",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

function StaffTable() {
  const [staffToDelete, setStaffToDelete] = useState(null);

  const {staff = [], isLoadingStaff} = useStaff();
  const {user} = useUser();
  const {blockStaff, unblockStaff, deleteStaff, isDeleting} = useManageStaff();

  const handleDelete = () => {
    if (!staffToDelete) return;
    deleteStaff(staffToDelete.id, {
      onSuccess: () => setStaffToDelete(null),
    });
  };

  if (isLoadingStaff) return <TableSkeleton cols={columns} rowsCount={4} />;

  if (!staff || staff.length === 0) {
    return (
      <EmptyTable
        cols={columns}
        message="No staff members found"
        Icon={WaitersIcon}
      />
    );
  }

  return (
    <>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Staff Table" className="min-w-[600px]">
            <Table.Header>
              {columns.map((col) => (
                <Table.Column key={col.key} isRowHeader={col.isRowHeader}>
                  {col.label}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body>
              {staff.map((member) => {
                const isSelf = user?.id === member.id;

                return (
                  <Table.Row key={member.id}>
                    <Table.Cell className="font-semibold text-foreground">
                      {member.full_name || "-"}
                    </Table.Cell>

                    <Table.Cell>{member.phone || "-"}</Table.Cell>

                    <Table.Cell className="capitalize font-medium">
                      {member.role || "-"}
                    </Table.Cell>

                    <Table.Cell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          member.status === "inactive"
                            ? "bg-danger/10 text-danger"
                            : "bg-success/10 text-success"
                        }`}>
                        {member.status || "active"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      {member.branch_id?.name ? (
                        <span className="text-accent font-medium">
                          {member.branch_id.name}
                        </span>
                      ) : (
                        "-"
                      )}
                    </Table.Cell>

                    <Table.Cell className="text-default-500">
                      {member.email || "-"}
                    </Table.Cell>

                    <Table.Cell>
                      {isSelf ? (
                        <span className="text-xs text-default-400 font-medium italic">
                          You
                        </span>
                      ) : (
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
                            <Dropdown.Menu aria-label="Staff actions">
                              {member.status === "inactive" ? (
                                <Dropdown.Item
                                  onPress={() => unblockStaff(member.id)}
                                  id="unblock"
                                  textValue="Unblock">
                                  <div className="flex items-center gap-2 text-success">
                                    <HugeiconsIcon
                                      icon={CheckmarkCircle01Icon}
                                      size={16}
                                    />
                                    <span>Unblock</span>
                                  </div>
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  onPress={() => blockStaff(member.id)}
                                  id="block"
                                  textValue="Block"
                                  className="text-warning">
                                  <div className="flex items-center gap-2 text-warning">
                                    <HugeiconsIcon
                                      icon={BlockedIcon}
                                      size={16}
                                    />
                                    <span>Block</span>
                                  </div>
                                </Dropdown.Item>
                              )}
                              <Dropdown.Item
                                onPress={() => setStaffToDelete(member)}
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
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <ConfirmDeleteModel
        open={Boolean(staffToDelete)}
        setOpen={(open) => !open && setStaffToDelete(null)}
        handleDelete={handleDelete}
        isPending={isDeleting}
        id={staffToDelete?.id}
        name={staffToDelete?.full_name || staffToDelete?.email}
      />
    </>
  );
}

export default StaffTable;

