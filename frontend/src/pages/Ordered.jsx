import React from "react";
import { SingleOrderFood, Button, StatusBadge } from "../componets";

export default function Ordered() {
  return (
    <>
      <div className="relative bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bgImage pt-20 pb-10 px-4  ">
        <div className="flex justify-between">
          <StatusBadge status={"Completed"} />
          <div className="flex flex-col items-center justify-center">
            <div className=" font-bold text-[20px] dark:text-white mx-10 font-serif">
              Total Price :- Rs 2000
            </div>
            <div className=" mx-10 my-2 text-center">
              <Button className>Order Now</Button>
            </div>
          </div>
        </div>

        <hr className="border-0 h-0.5 bg-gray-700 mx-4" />
        <div className="w-full max-w-3xl mx-auto">
          <SingleOrderFood />
          <SingleOrderFood />

          <SingleOrderFood />
          <SingleOrderFood />
          <SingleOrderFood />
          <SingleOrderFood />
          <SingleOrderFood />
          <SingleOrderFood />
        </div>
      </div>
    </>
  );
}
