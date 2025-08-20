import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import modeSlice from "./modeSlice";
import foodItemsSlice from "./foodItemSlice";
import cartSlice from "./cartSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    mode: modeSlice,
    foodItems: foodItemsSlice,
    cart: cartSlice,
  },
});

export default store;
