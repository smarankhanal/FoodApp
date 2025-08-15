import React from "react";
import "./App.css";
import { Footer, NavBar } from "./componets";
import SingleOrderHistory from "./pages/SingleOrderHistory";
import Ordered from "./pages/Ordered";
export default function App() {
  return (
    <div className="relative">
      <NavBar />
      {/* <Ordered /> */}
      <SingleOrderHistory />

      <Footer />
    </div>
  );
}
