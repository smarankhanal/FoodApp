import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import modeSlice from "./modeSlice";
import foodItemsSlice from "./foodItemSlice";
import cartSlice from "./cartSlice";
import registerSlice from "./registerSlice";
import singleFoodItemSlice from "./singleFoodItemSlice";
import orderSlice from "./orderSlice";
import historySlice from "./historySlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    mode: modeSlice,
    foodItems: foodItemsSlice,
    cart: cartSlice,
    register: registerSlice,
    singleFood: singleFoodItemSlice,
    order: orderSlice,
    history: historySlice,
  },
});

export default store;
