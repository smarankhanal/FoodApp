import React from "react";
import "./App.css";
import { Footer, NavBar } from "./componets";
import { Settings, User } from "./pages";

export default function App() {
  return (
    <div className="relative">
      <NavBar />
      <Settings />
      <Footer />
    </div>
  );
}
