import React from "react";
import Button from "../Button";
import Quantity from "./Quantity";

export default function FoodCard({ item }) {
  return (
    <div
      className="w-[300px] mt-4 ml-4 rounded-lg  bg-[#f6f6f6] dark:bg-[#000000]  dark:drop-shadow-[2px_2px_5px_white] drop-shadow-[2px_2px_5px_black] 
      hover:scale-[1.03] transition-transform duration-300 "
    >
      <div className="w-full overflow-hidden rounded-t-lg">
        <img
          src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ="
          alt="Food Item"
          className="relative w-full h-48 object-cover rounded-t-lg"
        />
        <span
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 cursor-pointer select-none hover:scale-[1.3] transition-transform duration-300"
          title="See Full Description"
        >
          ℹ️
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg dark:text-white text-black mb-1">
          {item.foodName}
        </h3>
        <p className="text-sm dark:text-gray-300 text-gray-700 mb-2">
          {item.description}
        </p>
        <p className="font-semibold dark:text-white text-black mb-4">
          Price :- {item.price}
        </p>
        <Quantity />

        <div className="flex flex-col justify-center items-center">
          <Button className="px-6 py-2 hover:bg-green-500">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
