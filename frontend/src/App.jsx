import React from "react";
import "./App.css";
import { Footer, NavBar } from "./components";
import { SingleOrderHistory } from "./pages";
export default function App() {
  return (
    <div className="relative">
      <NavBar />
      <SingleOrderHistory />
      <Footer />
    </div>
  );
}
