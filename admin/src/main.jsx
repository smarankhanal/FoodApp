import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { FoodItems, Home, LogIn, Order, User } from "./pages/index.js";
import PublicRoute from "./components/routes/PublicRoute.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";
import {
  ChangeOrderStatus,
  FoodItemDetails,
  FoodManager,
  OrderDetails,
  OrderItemSummary,
  UserDetails,
  UserOrderHistory,
} from "./components/index.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",

        element: (
          <PublicRoute>
            <LogIn />
          </PublicRoute>
        ),
      },
      {
        path: "/login",

        element: (
          <PublicRoute>
            <LogIn />
          </PublicRoute>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "/user",
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order",
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: "/fooditem",
        element: (
          <ProtectedRoute>
            <FoodItems />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-details/:userId",
        element: (
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-history/:userId",
        element: (
          <ProtectedRoute>
            <UserOrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-details/:userId/:orderId",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-status/:userId/:orderId",
        element: (
          <ProtectedRoute>
            <ChangeOrderStatus />
          </ProtectedRoute>
        ),
      },
      {
        path: "/food-item/:foodItemId",
        element: (
          <ProtectedRoute>
            <FoodItemDetails />
          </ProtectedRoute>
        ),
      },
      //
      {
        path: "/food-item/add",
        element: (
          <ProtectedRoute>
            <FoodManager />
          </ProtectedRoute>
        ),
      },
      {
        path: "/food-item/edit/:id",
        element: (
          <ProtectedRoute>
            <FoodManager />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
