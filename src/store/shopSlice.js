import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  storedProducts: 0,
  finalPrice: 0,
};

const shopSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, price } = action.payload;
      const findAddedItem = state.cart.find((item) => item.id === id);
      state.storedProducts += 1;
      state.finalPrice = state.cart.reduce(
        (acc, item) => acc + item.totalPriceByQuantity,
        0
      );

      if (findAddedItem) {
        findAddedItem.quantity++;
        findAddedItem.totalPriceByQuantity += price;
      } else {
        state.cart.push(action.payload);
      }

      state.finalPrice = state.cart.reduce(
        (acc, item) => acc + item.totalPriceByQuantity,
        0
      );
    },
    removeItem: (state, action) => {
      const { id, quantity, price } = action.payload;
      const findAddedItem = state.cart.find((item) => item.id === id);
      state.storedProducts -= 1;

      if (quantity > 1) {
        findAddedItem.quantity--;
        findAddedItem.totalPriceByQuantity -= price;
      } else {
        state.cart = state.cart.filter((item) => item.id !== id);
      }

      state.finalPrice = state.cart.reduce(
        (acc, item) => acc + item.totalPriceByQuantity,
        0
      );
    },
  },
});

export const { addItem, removeItem } = shopSlice.actions;

export default shopSlice.reducer;
