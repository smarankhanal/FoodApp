import React from "react";
import { MdDeleteSweep } from "react-icons/md";

export default function SingleOrderFood() {
  return (
    <div className=" relative flex flex-row m-2  dark:bg-black bg-white opacity-90 rounded-lg p-2 drop-shadow-[1px_1px_5px_black] dark:drop-shadow-[1px_1px_5px_white] ">
      <MdDeleteSweep className=" absolute top-2 right-2 h-7 w-7 text-red-500 hover:scale-[1.2]" />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FtLkRWNB8PmyvwOqk3FIfwv9VUE77E5sHw&s"
        alt="fooditem "
        className="h-30 w-50 rounded-lg animate-fadeIn"
      />
      <div className="ml-5 dark:text-white">
        <p className="text-xl font-bold">Food Item</p>

        <p className="font-semibold">Type: Main Course</p>
        <p className="font-semibold">Subcategory: Vegetarian</p>
        <p className="font-semibold">Quantity</p>

        <p className="font-bold text-lg mt-2">$12.99</p>
      </div>
    </div>
  );
}
