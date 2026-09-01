import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Chip,
  Link,
} from "@heroui/react";
import {
  ArrowUpRightStackIcon,
  ClockIcon,
  Delete,
  PhoneIcon,
} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useState} from "react";
import ConfirmDeleteModel from "../../../ui/ConfirmDeleteModel";
import useDeleteBranch from "./useDeleteBranch";
import BranchDrawer from "./BranchDrawer";
import {BranchStatus} from "../../../utils/constants";

function BranchItem({branch}) {
  const [open, setOpen] = useState(false);
  const {deleteBranch, isDeleting} = useDeleteBranch();

  const {
    id,
    name,
    address,
    phone,
    status,
    location,
    opening_time,
    closing_time,
    times,
  } = branch;

  const formattedTimes =
    opening_time && closing_time
      ? `${opening_time} - ${closing_time}`
      : times || "Not Available";

  const handleDelete = () => {
    deleteBranch(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{address}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <CardDescription className="flex items-center gap-1">
            <HugeiconsIcon icon={PhoneIcon} size={14} />
            {phone || "Not Available"}
          </CardDescription>

          <div className="flex items-center gap-3">
            <CardDescription>
              <Chip
                color={status === BranchStatus.ACTIVE ? "accent" : "danger"}
                className="capitalize">
                {status}
              </Chip>
            </CardDescription>

            <CardDescription className="flex items-center gap-1">
              <HugeiconsIcon icon={ClockIcon} size={14} />
              {formattedTimes}
            </CardDescription>
          </div>

          <CardDescription className="flex items-center gap-1">
            Location: {""}
            <Link
              href={location || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1">
              {location ? "on map" : "Not Available"}
              <HugeiconsIcon icon={ArrowUpRightStackIcon} size={14} />
            </Link>
          </CardDescription>
        </CardContent>
        <CardFooter className="flex gap-2">
          <BranchDrawer branchToEdit={branch} />
          <Button
            onClick={() => setOpen(true)}
            variant="danger"
            className="w-full">
            <HugeiconsIcon icon={Delete} />
            Delete
          </Button>
        </CardFooter>
      </Card>

      <ConfirmDeleteModel
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
        isPending={isDeleting}
        id={id}
        name={name}
      />
    </>
  );
}

export default BranchItem;
