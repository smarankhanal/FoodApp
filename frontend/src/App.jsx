import React, { use, useEffect } from "react";
import "./App.css";
import { Footer, NavBar } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/authSlice";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div className="relative">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
