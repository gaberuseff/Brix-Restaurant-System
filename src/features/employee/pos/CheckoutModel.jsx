import {Button, Input, Label, Modal, Radio, RadioGroup} from "@heroui/react";
import {PrinterIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useEffect, useState} from "react";
import {PAYMENT_METHODS} from "../../../utils/constants";
import {calculateChangeDue, formatCurrency} from "../../../utils/helpers";

function CheckoutModel({isOpen, onClose, totalAmount = 0, posType, cartItems}) {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountReceived, setAmountReceived] = useState("");

  console.log(cartItems);

  useEffect(() => {
    if (isOpen) {
      setAmountReceived("");
    }
  }, [isOpen]);

  const isDelivery = posType === "delivery";

  const changeDue = calculateChangeDue(amountReceived, totalAmount);
  const isContinueDisabled =
    !isDelivery &&
    paymentMethod === "cash" &&
    (!amountReceived || parseFloat(amountReceived) < totalAmount);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop isDismissable={false} variant="blur">
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-2xl">
            <Modal.Header>
              <Modal.Heading>
                {isDelivery ? "Confirm Delivery Order" : "Checkout"}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="space-y-4">
              {!isDelivery && (
                <div>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    name="paymentMethod"
                    variant="secondary">
                    <Label className="text-base font-semibold">
                      Payment Method
                    </Label>
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      {PAYMENT_METHODS.map((method) => (
                        <Radio
                          key={method.id}
                          value={method.id}
                          className="w-full">
                          <Radio.Content className="group relative flex w-full flex-col justify-between gap-4 rounded-xl border border-border/70 bg-surface px-4 py-4 transition-all hover:border-border hover:bg-surface-secondary/40 data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10 cursor-pointer">
                            <Radio.Control className="absolute end-4 top-3 size-5">
                              <Radio.Indicator />
                            </Radio.Control>
                            <div className="flex items-center gap-3 pe-6">
                              <div className="p-2.5 rounded-lg bg-surface-secondary/80 text-foreground flex items-center justify-center">
                                <HugeiconsIcon icon={method.icon} size={22} />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="font-semibold text-base">
                                  {method.name}
                                </span>
                                <span className="text-xs text-muted">
                                  {method.desc}
                                </span>
                              </div>
                            </div>
                          </Radio.Content>
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              <div className="flex justify-between items-center p-4 rounded-lg bg-surface-secondary">
                <p className="font-semibold text-lg">Total Amount: </p>
                <p className="font-bold text-2xl text-accent">
                  {formatCurrency(totalAmount)}
                </p>
              </div>

              {!isDelivery && paymentMethod === "cash" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label className="text-base font-medium">
                      Amount Received
                    </Label>
                    <Input
                      size="lg"
                      variant="secondary"
                      type="number"
                      placeholder="0.00"
                      autoFocus={isOpen}
                      value={amountReceived}
                      onChange={(e) => setAmountReceived(e.target.value)}
                      className="w-full text-lg font-semibold h-12"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-base font-medium">Change Due</Label>
                    <Input
                      size="lg"
                      variant="secondary"
                      type="number"
                      isDisabled
                      disabled
                      value={changeDue}
                      className="w-full text-lg font-semibold h-12 opacity-75 cursor-not-allowed"
                    />
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="w-full font-medium text-lg"
                size="lg"
                slot="close"
                onPress={onClose}>
                Cancel
              </Button>
              <Button
                className="w-full font-semibold text-lg"
                size="lg"
                slot="close"
                isDisabled={isContinueDisabled}>
                CONFIRM & PRINT BILL
                <HugeiconsIcon icon={PrinterIcon} />
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default CheckoutModel;
