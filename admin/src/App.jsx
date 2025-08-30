import React, { useEffect } from "react";
import "./App.css";
import { Navbar, Sidebar } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile } from "./store/adminAuthSlice";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, []);
  const { admin } = useSelector((state) => state.auth);
  return (
    <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage pt-2 min-h-screen">
      <Navbar />
      <div className="flex">
        {admin && <Sidebar />}
        <Outlet />
      </div>
    </div>
  );
}
