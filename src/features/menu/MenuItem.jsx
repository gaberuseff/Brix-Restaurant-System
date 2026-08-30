import {Button, Card, Chip, Separator} from "@heroui/react";
import {Delete, Image01Icon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useState} from "react";
import ConfirmDeleteModel from "../../ui/ConfirmDeleteModel";
import {formatCurrency} from "../../utils/helpers";
import MenuDrawer from "./MenuDrawer";
import useDeleteMenuItem from "./useDeleteMenuItem";

function MenuItem({item}) {
  const [open, setOpen] = useState(false);
  const {deleteMenuItem, isDeleting} = useDeleteMenuItem();

  const {
    id,
    name_en,
    name_ar,
    description_en,
    description_ar,
    price,
    image_url,
    is_available,
    categories,
  } = item;

  const categoryName = categories?.name;

  const handleDelete = () => {
    deleteMenuItem(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <>
      <Card className="p-0 overflow-hidden flex flex-col h-full">
        <div className="relative aspect-4/3 w-full overflow-hidden">
          {image_url ? (
            <img
              src={image_url}
              alt={name_en}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-default-400">
              <HugeiconsIcon icon={Image01Icon} size={32} />
            </div>
          )}

          {categoryName && (
            <div className="absolute top-3 left-3">
              <Chip
                size="sm"
                variant="flat"
                className="bg-background/80 backdrop-blur-md font-medium text-foreground">
                {categoryName}
              </Chip>
            </div>
          )}

          <div className="absolute top-3 right-3">
            <Chip
              size="sm"
              color={is_available ? "accent" : "danger"}
              variant="flat"
              className="backdrop-blur-md font-medium capitalize">
              {is_available ? "Available" : "Not Available"}
            </Chip>
          </div>
        </div>

        <div className="flex flex-col justify-between grow p-4 gap-3">
          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-base md:text-lg text-foreground tracking-tight line-clamp-1 group-hover:text-accent transition-colors">
                {name_en}
              </h3>
            </div>

            {description_en && (
              <p className="text-xs text-default-500 line-clamp-2 leading-relaxed pt-0.5">
                {description_en}
              </p>
            )}

            <Separator orientation="horizontal" className="my-2" />

            {name_ar && (
              <p
                className="text-xs md:text-sm font-medium text-default-500 line-clamp-1 text-right"
                dir="rtl">
                {name_ar}
              </p>
            )}

            {description_ar && (
              <p
                className="text-xs md:text-sm font-medium text-default-500 line-clamp-1 text-right"
                dir="rtl">
                {description_ar}
              </p>
            )}
          </div>

          <Separator orientation="horizontal" className="my-2" />

          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm font-semibold text-default-500 tracking-wider">
              Price
            </span>
            <span className="text-md font-bold text-foreground tracking-tight">
              {formatCurrency(price)}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <MenuDrawer itemToEdit={item} />
            <Button
              color="danger"
              variant="danger"
              className="w-full"
              onClick={() => setOpen(true)}>
              <HugeiconsIcon icon={Delete} size={16} />
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
        name={name_en}
      />
    </>
  );
}

export default MenuItem;
