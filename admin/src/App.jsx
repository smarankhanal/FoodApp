import React from "react";
import { Navbar, Sidebar } from "./components";
import "./App.css";
import Order from "./pages/Order";
import FoodItems from "./pages/FoodItems";
import User from "./pages/User";
export default function App() {
  return (
    <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage  pt-2">
      <Navbar />
      <div className="flex">
        <Sidebar />
      </div>
    </div>
  );
}
