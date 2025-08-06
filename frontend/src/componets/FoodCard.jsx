import React from "react";
import Button from "./Button";

export default function FoodCard() {
  return (
    <div
      className="w-[300px] mt-4 ml-4 rounded-lg 
                 bg-[#f6f6f6] dark:bg-[#000000] 
                 drop-shadow-md dark:drop-shadow-[2px_2px_5px_white] 
                 hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
    >
      <div className="w-full overflow-hidden rounded-t-lg">
        <img
          src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ="
          alt="Food Item"
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg dark:text-white text-black mb-1">
          Food Item
        </h3>
        <p className="text-sm dark:text-gray-300 text-gray-700 mb-2">
          Description of the food item goes here. Something tasty!
        </p>
        <p className="font-semibold dark:text-white text-black mb-4">
          Price: Rs 250
        </p>
        <div className="flex justify-center">
          <Button className="px-6 py-2">Order Now</Button>
        </div>
      </div>
    </div>
  );
}
