import { Button, ButtonGroup, Card } from "@heroui/react";
import {
  BadgeCentIcon,
  ShoppingCartRemove01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { orderTypes } from "../../../utils/constants";
import { formatCurrency } from "../../../utils/helpers";
import CartItem from "./CartItem";
import CheckoutModel from "./CheckoutModel";
import usePosBranch from "./usePosBranch";

function PosCart() {
  const [isCheckoutModelOpen, setIsCheckoutModelOpen] = useState(false);
  const [posType, setPosType] = useState("takeaway");
  const {branch} = usePosBranch();

  const items = useSelector((state) => state.cart.items);
  const isEmptyCart = !items || items.length === 0;

  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.totalPrice ?? (item.unitPrice ?? 0) * (item.quantity || 1)),
    0,
  );

  const total = subtotal;

  function handleCloseCheckoutModel() {
    setIsCheckoutModelOpen(false);
  }

  return (
    <>
      <Card className="p-4 flex flex-col justify-between h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {isEmptyCart ? (
            <div className="flex flex-col items-center justify-center h-full">
              <HugeiconsIcon
                icon={ShoppingCartRemove01Icon}
                className="size-16 text-default-400"
              />
              <p className="mt-4 font-medium text-default-400">
                Add items to the cart
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {items?.map((item) => (
                <CartItem key={item.cartItemId} item={item} />
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0 pt-4 border-t border-border flex flex-col gap-3">
          {/* نوع الطلب: في المطعم / تيك أواي / دليفري */}
          <div>
            <ButtonGroup className="w-full flex">
              {orderTypes.map((type) => {
                const isEnabled = branch ? branch[type.enabledKey] : true;
                if (!isEnabled) return null;

                const isSelected = posType === type.key;

                return (
                  <Button
                    key={type.key}
                    className="flex-1 text-xs font-semibold"
                    onClick={() => setPosType(type.key)}
                    color={isSelected ? "primary" : "default"}
                    variant={isSelected ? "primary" : "secondary"}>
                    <HugeiconsIcon icon={type.icon} size={16} />
                    {type.label}
                  </Button>
                );
              })}
            </ButtonGroup>
          </div>

          <div className="flex justify-between text-sm text-default-600">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {/* <div className="flex justify-between text-sm text-default-600">
          <span>Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div> */}
          <div className="flex justify-between font-bold text-xl pt-2 border-t border-border/50">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <Button
            color="primary"
            size="lg"
            isDisabled={isEmptyCart}
            onPress={() => setIsCheckoutModelOpen(true)}
            className="w-full mt-2 font-medium py-6 text-lg">
            <HugeiconsIcon icon={BadgeCentIcon} className="size-6" />
            Checkout
          </Button>
        </div>
      </Card>

      <CheckoutModel
        isOpen={isCheckoutModelOpen}
        onClose={handleCloseCheckoutModel}
        totalAmount={total}
        posType={posType}
        cartItems={items}
      />
    </>
  );
}

export default PosCart;
