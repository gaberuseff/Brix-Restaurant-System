import {Button, Card, Chip, Separator} from "@heroui/react";
import {useState} from "react";
import ConfirmDeleteModel from "../../ui/ConfirmDeleteModel";
import CategoryDrawer from "./CategoryDrawer";
import useDeleteCategory from "./useDeleteCategory";

function CategoryItem({category}) {
  const [open, setOpen] = useState(false);
  const {deleteCategory, isDeleting} = useDeleteCategory();

  const {
    id,
    name_en,
    name_ar,
    slug,
    description_en,
    description_ar,
    is_active,
  } = category;

  const handleDelete = () => {
    deleteCategory(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <>
      <Card className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 space-y-1">
              <p className="text-lg font-semibold truncate">{name_en}</p>
              <p className="text-sm text-default-500 ">
                {description_en || "No description provided."}
              </p>
            </div>
            <Chip
              size="sm"
              color={is_active ? "accent" : "danger"}
              variant="flat"
              className="capitalize shrink-0">
              {is_active ? "Active" : "Inactive"}
            </Chip>
          </div>

          <Separator />

          <div className="space-y-1 text-right">
            <p className="text-sm text-default-500 ">
              {name_ar || "No name provided."}
            </p>
            <p className="text-sm text-default-500 line-clamp-2">
              {description_ar || "No description provided."}
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <CategoryDrawer categoryToEdit={category} />
            <Button
              color="danger"
              variant="danger"
              className="w-full"
              onClick={() => setOpen(true)}>
              Delete
            </Button>
          </div>
        </div>
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

export default CategoryItem;
