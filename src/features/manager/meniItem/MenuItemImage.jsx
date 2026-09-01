import {Card} from "@heroui/react";

function MenuItemImage({imageUrl}) {
  return (
    <Card className="relative aspect-square w-1/4 p-0 overflow-hidden ">
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
    </Card>
  );
}

export default MenuItemImage;
