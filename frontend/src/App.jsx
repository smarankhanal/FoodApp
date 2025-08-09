import React from "react";
import "./App.css";
import { Footer, NavBar } from "./componets";
import { User } from "./pages";

export default function App() {
  return (
    <div className="relative">
      <NavBar />
      <User />
      <Footer />
    </div>
  );
}
