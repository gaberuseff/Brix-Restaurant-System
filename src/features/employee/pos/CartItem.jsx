import { Button, Card } from "@heroui/react";
import { Delete01Icon, MinusIcon, PlusIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../../utils/helpers";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "./cartSlice";

function CartItem({item}) {
  const dispatch = useDispatch();

  const {
    cartItemId,
    productName = "",
    variant = {},
    modifiers = [],
    quantity = 1,
  } = item || {};

  const totalPrice = item?.totalPrice ?? (item?.unitPrice ?? 0) * quantity;

  function handleIncrease() {
    dispatch(increaseQuantity(cartItemId));
  }

  function handleDecrease() {
    if (quantity === 1) {
      dispatch(removeFromCart(cartItemId));
    } else {
      dispatch(decreaseQuantity(cartItemId));
    }
  }

  return (
    <Card variant="secondary" className="p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm line-clamp-1 text-foreground">
            {productName}
          </h3>
          {variant?.name && (
            <p className="text-xs text-default-500 font-medium mt-0.5">
              Size: <span className="text-foreground/80">{variant.name}</span>
            </p>
          )}
        </div>

        <span className="font-bold text-sm text-primary shrink-0">
          {formatCurrency(totalPrice)}
        </span>
      </div>

      {modifiers && modifiers.length > 0 && (
        <div className="mt-2 py-1.5 px-2.5 rounded-lg bg-default-100/70 dark:bg-default-50/10 border border-border/40 flex flex-col gap-1 text-xs">
          {modifiers.map((modifier) => {
            const name = modifier.name_en || modifier.name_ar || modifier.name;
            const price = Number(modifier.price || 0);

            return (
              <div
                key={modifier.id}
                className="flex items-center justify-between text-default-600">
                <span className="flex items-center gap-1.5 min-w-0">
                  <span className="size-1 rounded-full bg-default-400 shrink-0" />
                  <span className="truncate">{name}</span>
                </span>
                {price > 0 && (
                  <span className="text-default-400 font-medium shrink-0 ml-2">
                    +{formatCurrency(price)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border/40 mt-2">
        <span className="text-xs text-default-400 font-medium">Quantity</span>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            onClick={handleDecrease}
            className="size-7 min-w-7">
            <HugeiconsIcon
              icon={quantity === 1 ? Delete01Icon : MinusIcon}
              size={14}
            />
          </Button>

          <span className="w-5 text-center font-bold text-xs">{quantity}</span>

          <Button
            size="sm"
            variant="flat"
            isIconOnly
            onClick={handleIncrease}
            className="size-7 min-w-7">
            <HugeiconsIcon icon={PlusIcon} size={14} />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
