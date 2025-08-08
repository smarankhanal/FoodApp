import React from "react";
import "./App.css";
import { Footer, NavBar } from "./componets";
import FoodPage from "./pages/FoodPage";

export default function App() {
  return (
    <div>
      <NavBar />
      <FoodPage />
      <Footer />
    </div>
  );
}
