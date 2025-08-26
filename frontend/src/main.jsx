import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Address, PublicRoute } from "./components/index";
import { PersistGate } from "redux-persist/integration/react";

import { ProtectedRoute } from "./components/index";

import {
  FoodItems,
  FoodPage,
  HelpSupport,
  Login,
  LoginHome,
  LoginPage,
  OrderItems,
  Register,
  Settings,
  SingleOrderHistory,
  User,
  UserHistory,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <LoginHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/foodItems",
        element: (
          <ProtectedRoute>
            <FoodItems />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order",
        element: (
          <ProtectedRoute>
            <OrderItems />
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
        path: "/address",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
      {
        path: "/help&support",
        element: (
          <ProtectedRoute>
            <HelpSupport />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-history",
        element: (
          <ProtectedRoute>
            <UserHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/foodItem/:id",
        element: (
          <ProtectedRoute>
            <FoodPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/singleOrderHistory/:orderId",
        element: (
          <ProtectedRoute>
            <SingleOrderHistory />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
