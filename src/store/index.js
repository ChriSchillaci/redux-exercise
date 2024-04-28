import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import shopSlice from "./shopSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    cart: shopSlice,
  },
});
