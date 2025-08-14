import React from "react";
import { FoodManager, Navbar, Sidebar } from "./components";
import "./App.css";

export default function App() {
  return (
    <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage pt-2 min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <FoodManager />
      </div>
    </div>
  );
}
