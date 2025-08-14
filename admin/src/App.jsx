import React from "react";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import Login from "./pages/Login";
export default function App() {
  return (
    <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage pt-2 min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Login />
      </div>
    </div>
  );
}
