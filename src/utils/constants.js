import {
  Cash01Icon,
  CreditCardIcon,
  DeliveryTruck01Icon,
  Restaurant01Icon,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons";

export const BranchStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const MenuItemStatus = [
  {id: "active", name: "Active"},
  {id: "inactive", name: "Inactive"},
];

export const PAGE_SIZE = 8;

export const orderTypes = [
  {
    key: "dine_in",
    id: "dine_in",
    label: "Dine In",
    icon: Restaurant01Icon,
    enabledKey: "is_dine_in_enabled",
  },
  {
    key: "takeaway",
    id: "takeaway",
    label: "Takeaway",
    icon: ShoppingBag01Icon,
    enabledKey: "is_takeaway_enabled",
  },
  {
    key: "delivery",
    id: "delivery",
    label: "Delivery",
    icon: DeliveryTruck01Icon,
    enabledKey: "is_delivery_enabled",
  },
];

export const POS_TYPES = orderTypes;

export const PAYMENT_METHODS = [
  {
    id: "cash",
    name: "Cash",
    desc: "physical cash",
    icon: Cash01Icon,
  },
  {
    id: "card",
    name: "Card",
    desc: "Credit / Debit Card",
    icon: CreditCardIcon,
  },
];
