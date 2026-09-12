import {Button, Card} from "@heroui/react";
import {PlusIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useState} from "react";
import PosItemModel from "./PosItemModel";

function PosMenuItem({item}) {
  if (!item) return null;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {name_en, is_available, variants = [], modifierGroups = []} = item;

  return (
    <>
      <Card className="p-0 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col justify-between grow p-3 gap-2">
          <div className="space-y-2">
            <h3 className="font-bold text-base line-clamp-1">{name_en}</h3>

            <div className="flex gap-1 flex-wrap">
              {variants.map((variant) => (
                <Card
                  key={variant.id}
                  className="px-2 py-1 text-xs flex flex-row items-center justify-between gap-1 flex-1 min-w-[70px]"
                  variant="tertiary">
                  <span className="font-medium truncate">
                    {variant.name_en}
                  </span>
                  <span className="shrink-0">({variant.price})</span>
                </Card>
              ))}
            </div>
          </div>

          <Button
            color="primary"
            size="lg"
            className="w-full mt-2 font-medium flex items-center justify-center gap-1"
            onClick={() => setIsModalOpen(true)}
            disabled={!is_available}>
            <HugeiconsIcon icon={PlusIcon} size={14} />
            Add
          </Button>
        </div>
      </Card>

      <PosItemModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={item}
        variants={variants}
        modifierGroups={modifierGroups}
      />
    </>
  );
}

export default PosMenuItem;
