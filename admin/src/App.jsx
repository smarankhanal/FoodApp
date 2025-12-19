import React, { useEffect } from "react";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage pt-2 min-h-screen overflow-hidden">
      <Navbar />
      <div className="flex">
        {token && <Sidebar />}
        <Outlet />
      </div>
    </div>
  );
}
