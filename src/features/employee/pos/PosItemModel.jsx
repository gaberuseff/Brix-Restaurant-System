import {
  Button,
  Checkbox,
  CheckboxGroup,
  Description,
  Label,
  Modal,
  Radio,
  RadioGroup,
} from "@heroui/react";
import {nanoid} from "nanoid";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {formatCurrency} from "../../../utils/helpers";
import {addToCart} from "./cartSlice";

function PosItemModel({
  isOpen,
  onClose,
  item,
  variants = [],
  modifierGroups = [],
}) {
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedModifiers, setSelectedModifiers] = useState({});

  // إعادة ضبط التحديد عند فتح النافذة
  useEffect(() => {
    if (isOpen) {
      setSelectedVariant(variants[0]?.id ? String(variants[0].id) : "");
      setSelectedModifiers({});
    }
  }, [isOpen, variants]);

  function handleModifierGroupChange(groupId, values) {
    setSelectedModifiers((prev) => ({
      ...prev,
      [groupId]: values,
    }));
  }

  // 1. الحجم المختار وسعره الأساسي
  const selectedVariantObj = variants.find(
    (v) => String(v.id) === String(selectedVariant),
  );
  const basePrice = Number(selectedVariantObj?.price || 0);

  // 2. قائمة الإضافات المختارة وحساب مجموع أسعارها
  const selectedModifierList = modifierGroups.flatMap((group) => {
    const selectedIds = selectedModifiers[group.id] || [];
    return (group.modifiers || [])
      .filter((mod) => selectedIds.includes(String(mod.id)))
      .map((mod) => ({
        id: mod.id,
        name: mod.name_en || mod.name_ar,
        price: Number(mod.price || 0),
      }));
  });

  const totalModifierPrice = selectedModifierList.reduce(
    (sum, mod) => sum + mod.price,
    0,
  );

  // 3. السعر الإجمالي للعنصر
  const totalPrice = basePrice + totalModifierPrice;

  function handleAddToCart() {
    const cartItem = {
      cartItemId: nanoid(),
      productId: item.id,
      productName: item.name_en || item.name_ar,

      variant: selectedVariantObj
        ? {
            id: selectedVariantObj.id,
            name: selectedVariantObj.name_en || selectedVariantObj.name_ar,
            price: basePrice,
          }
        : null,

      modifiers: selectedModifierList,
      quantity: 1,
      unitPrice: totalPrice,
      totalPrice,
    };

    dispatch(addToCart(cartItem));
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="cover">
          <Modal.Dialog className="sm:max-w-2xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-2xl font-medium">
                {item?.name_en || item?.name_ar || "Add Item"}
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="space-y-6">
              {/* 1. قسم الأحجام (Variants / Sizes) */}
              {variants.length > 0 && (
                <section className="flex w-full flex-col gap-3">
                  <RadioGroup
                    value={selectedVariant}
                    onChange={setSelectedVariant}
                    name="variant"
                    variant="secondary">
                    <Label className="text-base font-semibold">
                      Choose The Size
                    </Label>
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                      {variants.map((variant) => (
                        <Radio
                          key={variant.id}
                          value={String(variant.id)}
                          className="w-full">
                          <Radio.Content className="group relative flex w-full flex-col justify-between gap-6 rounded-xl border border-border/70 bg-surface px-4 py-4 transition-all hover:border-border hover:bg-surface-secondary/40 data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10 cursor-pointer">
                            <Radio.Control className="absolute end-4 top-3 size-5">
                              <Radio.Indicator />
                            </Radio.Control>
                            <div className="flex flex-col gap-1 pe-6">
                              <span className="font-semibold text-base">
                                {variant.name_en || variant.name_ar}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-accent">
                              {formatCurrency(variant.price)}
                            </span>
                          </Radio.Content>
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                </section>
              )}

              {/* 2. قسم مجموعات الإضافات (Modifier Groups) */}
              {modifierGroups.length > 0 && (
                <div className="flex flex-col gap-6 pt-2 border-t border-border/50">
                  {modifierGroups.map((group) => (
                    <div key={group.id} className="flex flex-col gap-2.5">
                      <div>
                        <Label className="text-base font-semibold">
                          {group.name_en || group.name_ar}
                        </Label>
                        {(group.min_selection > 0 ||
                          group.max_selection > 0) && (
                          <Description className="text-xs text-muted">
                            {group.min_selection > 0
                              ? `Required (Min: ${group.min_selection})`
                              : "Optional"}
                            {group.max_selection > 0
                              ? ` • Max: ${group.max_selection}`
                              : ""}
                          </Description>
                        )}
                      </div>

                      <CheckboxGroup
                        name={`modifier_group_${group.id}`}
                        value={selectedModifiers[group.id] || []}
                        onChange={(vals) =>
                          handleModifierGroupChange(group.id, vals)
                        }
                        className="w-full">
                        <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2">
                          {group.modifiers?.map((modifier) => (
                            <Checkbox
                              variant="secondary"
                              key={modifier.id}
                              value={String(modifier.id)}
                              className="w-full">
                              <Checkbox.Content
                                className="group relative flex w-full items-center justify-between p-3.5 
                              rounded-xl border border-border/70 bg-surface hover:border-border hover:bg-surface-secondary/40 data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10 transition-all cursor-pointer">
                                <div className="flex items-center gap-2.5">
                                  <Checkbox.Control>
                                    <Checkbox.Indicator />
                                  </Checkbox.Control>
                                  <span className="font-medium text-sm">
                                    {modifier.name_en || modifier.name_ar}
                                  </span>
                                </div>
                                <span className="text-sm font-semibold text-accent">
                                  {Number(modifier.price) > 0
                                    ? `+${formatCurrency(modifier.price)}`
                                    : "Free"}
                                </span>
                              </Checkbox.Content>
                            </Checkbox>
                          ))}
                        </div>
                      </CheckboxGroup>
                    </div>
                  ))}
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                className="w-full"
                size="lg"
                variant="secondary"
                onPress={onClose}>
                Close
              </Button>

              <Button
                className="w-full"
                size="lg"
                color="primary"
                onPress={handleAddToCart}>
                Add to Cart • {formatCurrency(totalPrice)}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default PosItemModel;
