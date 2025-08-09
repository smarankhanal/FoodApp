import React from "react";
import { SingleOrderFood } from "../componets";

export default function SingleOrderHistory() {
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')]  bgImage pt-20">
      <div className=" w-full max-w-3xl mx-auto dark:text-white mb-10 text-[20px] font-serif font-bold">
        <div className="grid grid-cols-3 gap-4 bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 rounded-t-md px-4 py-2">
          <div>Order Id</div>
          <div>Date</div>
          <div>Total Price</div>
        </div>

        <div className="grid grid-cols-3 gap-4 border border-t-0 border-gray-400 dark:border-gray-600 rounded-b-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <div>12345</div>
          <div>2025-08-09</div>
          <div>$150</div>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto">
        <SingleOrderFood />
        <SingleOrderFood />
      </div>
    </div>
  );
}
