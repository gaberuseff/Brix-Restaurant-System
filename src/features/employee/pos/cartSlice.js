import {createSlice} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: {
      reducer(state, action) {
        const newItem = action.payload;

        const existingItem = state.items.find((item) =>
          areSameCartItem(item, newItem),
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;

          const unitPrice = existingItem.unitPrice ?? 0;
          existingItem.totalPrice = unitPrice * existingItem.quantity;

          return;
        }

        state.items.push(newItem);
      },

      prepare(item) {
        return {
          payload: {
            cartItemId: nanoid(),
            ...item,
          },
        };
      },
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.cartItemId !== action.payload,
      );
    },

    increaseQuantity(state, action) {
      const item = state.items.find(
        (item) => item.cartItemId === action.payload,
      );

      if (!item) return;

      item.quantity += 1;
      const unitPrice = item.unitPrice ?? 0;
      item.totalPrice = unitPrice * item.quantity;
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(
        (item) => item.cartItemId === action.payload,
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        const unitPrice = item.unitPrice ?? 0;
        item.totalPrice = unitPrice * item.quantity;
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

function areSameCartItem(itemA, itemB) {
  const prodA = itemA.productId ?? itemA.product_id;
  const prodB = itemB.productId ?? itemB.product_id;
  if (prodA !== prodB) {
    return false;
  }

  if (itemA.variant?.id !== itemB.variant?.id) {
    return false;
  }

  const modifiersA = (itemA.modifiers || [])
    .map((modifier) => String(modifier.id))
    .sort();

  const modifiersB = (itemB.modifiers || [])
    .map((modifier) => String(modifier.id))
    .sort();

  if (modifiersA.length !== modifiersB.length) {
    return false;
  }

  return modifiersA.every((id, index) => id === modifiersB[index]);
}
