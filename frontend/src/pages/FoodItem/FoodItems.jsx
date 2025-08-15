import React from "react";
import { FoodCard } from "../../components";

export default function FoodItems() {
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')]  bgImage pt-20">
      <div className="grid grid-cols-3 m-2">
        <FoodCard />
        <FoodCard />
      </div>
    </div>
  );
}
