import React from "react";
import "./App.css";
import { FoodPage, Footer, NavBar, SingleOrderFood } from "./componets";
import Ordered from "./pages/Ordered";

export default function App() {
  return (
    <div>
      <NavBar />
      <Ordered />
      <Footer />
      {/* <SingleOrderFood /> */}

      {/* <FoodPage /> */}
    </div>
  );
}
