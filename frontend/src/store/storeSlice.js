import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQunatity: 0,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity = +1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
      state.totalQunatity = +1;
      state.totalPrice = product.price * state.totalQunatity;
    },
    removeCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);
      if (existingItem) {
        state.totalQunatity -= existingItem.totalQunatity;
        state.totalPrice -= existingItem.price * state.totalQunatity;
        state.items = state.filter((item) => item.id !== product.id);
      }
    },
    decreaseQty: (state, action) => {
      const product = state.payload;
      const existingItem = state.find((item) => item.id === product.id);
      if (existingItem && existingItem.quantity < 1) {
        existingItem.quantity -= 1;
        state.totalQunatity -= 1;
        state.totalPrice -= existingItem.price;
      }
    },
  },
});
export const { addToCart, clearCart, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
