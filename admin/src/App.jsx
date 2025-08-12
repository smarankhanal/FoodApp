import React from "react";
import { Navbar, Sidebar } from "./components";
import "./App.css";
export default function App() {
  return (
    <div className="dark:bg-black bg-white min-h-screen pt-2">
      <Navbar />
      <Sidebar />
    </div>
  );
}
