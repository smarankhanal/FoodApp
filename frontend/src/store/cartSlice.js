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
      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += Number(product.price) || 0;
    },

    removeCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item._id === productId);

      if (existingItem) {
        state.totalPrice -= Number(existingItem.price) * existingItem.quantity;
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item._id !== productId);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },

    decreaseQty: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item._id === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalPrice -= Number(existingItem.price) || 0;
          state.totalQuantity -= 1;
        } else {
          state.items = state.items.filter((item) => item._id !== productId);
          state.totalQuantity -= 1;
          state.totalPrice -= Number(existingItem.price) || 0;
        }
      }
    },

    increaseQty: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item._id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalPrice += Number(existingItem.price) || 0;
        state.totalQuantity += 1;
      }
    },
  },
});

export const { addToCart, removeCart, decreaseQty, increaseQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
