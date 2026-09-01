import {Button, Card, Chip, Separator} from "@heroui/react";
import {
  ArrowRight,
  Delete01Icon,
  Image01Icon,
} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useNavigate} from "react-router-dom";
import {formatCurrency} from "../../../utils/helpers";

function MenuItem({item}) {
  const navigate = useNavigate();
  const {id, name_en, price, image_url, is_available, categories} = item;

  const categoryName = categories?.name_en;

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
        </div>

        <div className="flex flex-col justify-between grow p-4 gap-3">
          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-base md:text-lg">{name_en}</h3>
              <Chip
                size="sm"
                color={is_available ? "accent" : "danger"}
                variant="flat"
                className="backdrop-blur-md font-medium capitalize">
                {is_available ? "Available" : "Not Available"}
              </Chip>
            </div>
          </div>

          <Separator orientation="horizontal" className="my-2" />

          <div className="flex items-center justify-between mt-auto">
            <span className="font-semibold text-default-500 tracking-wider">
              Price
            </span>
            <span className="text-lg font-bold text-primary tracking-tight">
              {formatCurrency(price)}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button isIconOnly color="danger">
              <HugeiconsIcon icon={Delete01Icon} />
            </Button>
            <Button
              onPress={() => navigate(`/menu/${id}`)}
              variant="secondary"
              color="primary"
              className="flex-1">
              View Item
              <HugeiconsIcon icon={ArrowRight} size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default MenuItem;
