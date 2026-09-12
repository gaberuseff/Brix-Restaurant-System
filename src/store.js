import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./features/employee/pos/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
