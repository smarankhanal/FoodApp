import React from "react";
import { SingleOrderFood, Button } from "../componets";

export default function Ordered() {
  return (
    <>
      <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bgImage pt-20 pb-10 px-4 grid grid-cols-2 gap-4">
        <SingleOrderFood />
        <SingleOrderFood />

        <SingleOrderFood />
        <SingleOrderFood />
        <SingleOrderFood />
        <SingleOrderFood />
        <SingleOrderFood />
        <SingleOrderFood />
      </div>
      <hr className="border-0 h-0.5 bg-gray-700 mx-4" />
      <div className=" flex justify-end right font-bold text-[30px] dark:text-white mx-10 my-2">
        Total Price :- Rs 2000
      </div>
      <div className="flex justify-end mx-10 my-2">
        <Button className="h-12  hover:bg-red-600  text-[20px]">
          Order Now
        </Button>
      </div>
    </>
  );
}
