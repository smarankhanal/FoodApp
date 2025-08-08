import React from "react";
import { FoodCard } from "../componets";

export default function FoodCardPage() {
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')]  bgImage pt-20">
      <FoodCard />
    </div>
  );
}
