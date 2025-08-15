import React from "react";
import "./App.css";
import { Footer, NavBar } from "./components";
import {
  FoodItems,
  FoodPage,
  OrderItems,
  Settings,
  User,
  UserHistory,
} from "./pages";
export default function App() {
  return (
    <div className="relative">
      <NavBar />
      {/* <Ordered /> */}
      {/* <SingleOrderHistory /> */}
      {/* <FoodItems /> */}
      {/* <OrderItems /> */}
      {/* <Settings /> */}
      {/* <FoodPage /> */}
      {/* <User /> */}
      <UserHistory />
      <Footer />
    </div>
  );
}
