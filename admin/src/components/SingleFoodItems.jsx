import React from "react";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Status from "./Status";

export default function SingleFoodItems() {
  return (
    <div className="flex-1 bg-black dark:bg-white rounded-lg m-4 p-2 dark:text-black text-white flex items-center">
      <div className="flex-1">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FtLkRWNB8PmyvwOqk3FIfwv9VUE77E5sHw&s"
          alt="fooditem"
          className="rounded-lg h-12 w-20 object-cover"
        />
      </div>

      <p className="flex-1">Name</p>
      <div className="flex-1">
        <p className="mb-1">Category</p>

        <Status className="text-red-500 drop-shadow-[2px_2px_red]">
          Non-Veg
        </Status>
      </div>
      <p className="flex-1">20000</p>
      <div className="flex flex-1 gap-3">
        <div
          className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03]"
          title="Delete FoodItem"
        >
          <MdDelete className="text-[20px] text-red-500" />
        </div>
        <div
          className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03]"
          title="Edit FoodItems"
        >
          <FaRegEdit className="text-[18px] text-blue-500" />
        </div>
        <div
          className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03]"
          title="View FoodItems"
        >
          <FaRegEye className="text-[18px] text-amber-500" />
        </div>
      </div>
    </div>
  );
}
