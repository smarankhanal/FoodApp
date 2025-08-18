import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import modeSlice from "./modeSlice";
const store = configureStore({
  reducer: { auth: authSlice, mode: modeSlice },
});

export default store;
