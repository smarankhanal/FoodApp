import React from "react";
import "./App.css";
import { FoodCard, Footer, NavBar } from "./componets";
import {
  FoodCardPage,
  Ordered,
  SingleOrderHistory,
  UserHistory,
} from "./pages";

export default function App() {
  return (
    <div>
      <NavBar />
      <SingleOrderHistory />
      {/* <Ordered /> */}
      <Footer />
    </div>
  );
}
