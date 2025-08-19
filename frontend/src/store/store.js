import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import modeSlice from "./modeSlice";
import foodItemsSlice from "./foodItemSlice";
const store = configureStore({
  reducer: { auth: authSlice, mode: modeSlice, foodItems: foodItemsSlice },
});

export default store;
