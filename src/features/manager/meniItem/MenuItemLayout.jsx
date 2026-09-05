import {Separator} from "@heroui/react";
import {useParams} from "react-router-dom";
import BackButton from "../../../ui/BackButton";
import ErrorState from "../../../ui/ErrorState";
import Heading from "../../../ui/Heading";
import MenuItemData from "./MenuItemData";
import MenuItemDataSkeleton from "./MenuItemDataSkeleton";
import MenuItemImage from "./MenuItemImage";
import MenuItemModifires from "./MenuItemModifires";
import MenuItemVariantModel from "./MenuItemVariantModel";
import MenuItemVariants from "./MenuItemVariants";
import useMenuItem from "./useMenuItem";
import MenuItemModifireGroupsModel from "./MenuItemModifireGroupsModel";

function MenuItemLayout() {
  const {id} = useParams();
  const {menuItem, isMenuItemLoading, variants, modifierGroups, isError} =
    useMenuItem(id);

  if (isMenuItemLoading)
    return (
      <div className="space-y-6">
        <BackButton />
        <MenuItemDataSkeleton />
      </div>
    );

  if (isError || !menuItem) {
    return (
      <div className="space-y-6">
        <BackButton />
        <ErrorState
          title="Item Not Found"
          message="The requested menu item does not exist or the ID is invalid."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BackButton />

      <MenuItemImage item={menuItem} imageUrl={menuItem?.image_url} />
      <MenuItemData item={menuItem} />
      <Separator className="my-6" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <Heading as="h2">Variants / Sizes</Heading>
          <MenuItemVariantModel />
        </div>
        <MenuItemVariants variants={variants} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Heading as="h2">Modifiers / Add-ons</Heading>
          <MenuItemModifireGroupsModel />
        </div>
        <MenuItemModifires modifierGroups={modifierGroups} />
      </div>
    </div>
  );
}

export default MenuItemLayout;
