import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminAuthSlice from "./adminAuthSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import foodItemSlice from "./foodItemSlice";
import singleUserSlice from "./singleUserSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: adminAuthSlice,
  user: userSlice,
  order: orderSlice,
  foodItem: foodItemSlice,
  singleUser: singleUserSlice,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "order", "foodItem", "singleUser"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;
