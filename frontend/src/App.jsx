import "./App.css";
import { DarkModeInitializer, Footer, NavBar } from "./components";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="relative">
      <DarkModeInitializer />
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
