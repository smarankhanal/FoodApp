import React from "react";
import { SingleOrderItem } from "../../components";

export default function SingleOrderHistory() {
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')]  bgImage pt-20">
      <div className=" w-full max-w-3xl mx-auto dark:text-white mb-10 text-[20px] font-serif font-bold">
        <div className="flex bg-amber-500 rounded-lg mb-3 p-1">
          <p className="flex-1">Order Id</p>
          <p className="flex-1">Date</p>
          <p className="flex-1">Status</p>
          <p className="flex-1">Total Price</p>
        </div>

        <div className="flex dark:bg-white bg-black dark:text-black text-white rounded-lg mb-2 p-1">
          <p className="flex-1">12345</p>
          <p className="flex-1">2025-08-09</p>
          <p className="flex-1">Completed</p>
          <p className="flex-1">$150</p>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto">
        <SingleOrderItem />
        <SingleOrderItem />
      </div>
    </div>
  );
}
