import {Button, Separator, Tooltip} from "@heroui/react";
import {HugeiconsIcon} from "@hugeicons/react";
import Heading from "../../../ui/Heading";
import ModifireGroupsModel from "./ModifireGroupsModel";
import ModifireGroupsTable from "./ModifireGroupsTable";
import ModifireModel from "./ModifireModel";
import ModifiresTable from "./ModifiresTable";
import {InfoIcon} from "@hugeicons/core-free-icons";

function ModifiresLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Heading as="h1">Modifires</Heading>
        <Tooltip delay={0}>
          <Button
            isIconOnly
            size="sm"
            aria-label="More information"
            variant="tertiary">
            <HugeiconsIcon icon={InfoIcon} />
          </Button>
          <Tooltip.Content
            placement="bottom"
            className="max-w-md p-3 space-y-2">
            <p className="text-sm font-semibold text-foreground">
              Guide to Modifiers & Groups:
            </p>
            <ul className="text-xs space-y-1.5 list-disc pl-4 text-default-600">
              <li>
                <strong className="text-foreground">1. Modifier Groups:</strong>{" "}
                Defines the option group and selection rules (e.g., "Burger
                Extras" with Min: 0, Max: 3).
              </li>
              <li>
                <strong className="text-foreground">2. Modifiers:</strong> The
                actual individual items and their prices (e.g., "Extra Cheese -
                15 LE") linked to a group.
              </li>
              <li>
                <strong className="text-foreground">Relationship:</strong> Every
                Modifier must belong to a Modifier Group so it appears organized
                when ordering menu items.
              </li>
            </ul>
          </Tooltip.Content>
        </Tooltip>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Heading as="h3">Modifier Groups</Heading>
          <ModifireGroupsModel />
        </div>

        <div className="pb-6">
          <ModifireGroupsTable />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <Heading as="h3">Modifiers</Heading>
          <ModifireModel />
        </div>

        <div>
          <ModifiresTable />
        </div>
      </div>
    </div>
  );
}

export default ModifiresLayout;
