import { configureStore, combineReducers } from "@reduxjs/toolkit";
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

import authSlice from "./authSlice";
import modeSlice from "./modeSlice";
import foodItemsSlice from "./foodItemSlice";
import cartSlice from "./cartSlice";
import registerSlice from "./registerSlice";
import singleFoodItemSlice from "./singleFoodItemSlice";
import orderSlice from "./orderSlice";
import historySlice from "./historySlice";
import reviewSlice from "./reviewSlice";
import updateSlice from "./updateSlice";
import passwordSlice from "./passwordSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  mode: modeSlice,
  foodItems: foodItemsSlice,
  cart: cartSlice,
  register: registerSlice,
  singleFood: singleFoodItemSlice,
  order: orderSlice,
  history: historySlice,
  review: reviewSlice,
  update: updateSlice,
  password: passwordSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "mode", "history"],
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
