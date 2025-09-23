import { useDispatch } from "react-redux";
import "./App.css";
import { DarkModeInitializer, Footer, NavBar } from "./components";
import { Outlet } from "react-router-dom";
import { getMe } from "./store/authSlice";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <div className="relative">
      <DarkModeInitializer />
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
