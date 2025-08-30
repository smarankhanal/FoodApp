import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { FoodItems, Home, LogIn, Order, User } from "./pages/index.js";
import PublicRoute from "./components/routes/publicRoute.jsx";
import ProtectedRoute from "./components/routes/protectedRoute.jsx";
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
        path: "fooditem",
        element: (
          <ProtectedRoute>
            <FoodItems />
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
