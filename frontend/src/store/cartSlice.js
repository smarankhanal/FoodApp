import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exisitingItem = state.items.find((item) => item._id === product.id);
      if (exisitingItem) {
        exisitingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += Number(product.price);
    },

    removeCart: (state, action) => {
      const productId = action.payload;
      const exisitingItem = state.items.find((item) => item._id === productId);
      if (exisitingItem) {
        state.totalPrice -= Number(
          exisitingItem.price * exisitingItem.quantity
        );
        state.totalQuantity -= exisitingItem.quantity;
        state.items = state.items.filter((item) => item._id !== productId);
      }
    },

    decreaseQty: (state, action) => {
      const productId = action.payload;
      const exisitingItem = state.items.find((item) => item._id === productId);
      if (exisitingItem) {
        if (exisitingItem.quantity > 1) {
          exisitingItem.quantity -= 1;
          state.totalPrice -= Number(exisitingItem.price);
          state.totalQuantity -= exisitingItem.quantity;
        } else {
          state.items = state.items.filter((item) => item._id !== productId);
          state.totalQuantity -= 1;
          state.totalPrice = Number(exisitingItem.price);
        }
      }
    },
    increaseQty: (state, action) => {
      const productId = action.payload;
      const exisitingItem = state.items.find((item) => item._id === productId);

      if (!exisitingItem) {
        return;
      }
      exisitingItem.quantity += 1;
      state.totalPrice += Number(exisitingItem.price);
      state.totalQuantity += exisitingItem.quantity;
    },
  },
});

export const { addToCart, removeCart, decreaseQty, increaseQty } =
  cartSlice.actions;
export default cartSlice.reducer;
