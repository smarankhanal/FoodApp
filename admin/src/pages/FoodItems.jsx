import React from "react";
import { Search, FoodItem } from "../components";
import { MdOutlineAdd } from "react-icons/md";

import Button from "../components/Button";
export default function FoodItems() {
  return (
    <div className=" dark:text-white  text-black  mt-10 ml-5 p-4 flex-1 w-full max-w-4xl max-h-fit font-serif ">
      <Search />
      <div className="flex justify-between items-center">
        <p className="font-bold font-serif text-[20px]">Total FoodItems :-</p>

        <Button className=" dark:bg-blue-700  bg-blue-600 text-white  w-[100px] flex items-center justify-center gap-1">
          Add
          <MdOutlineAdd />
        </Button>
      </div>

      <div className="flex m-4 bg-amber-500 rounded-lg p-2">
        <p className="flex-1 font-bold">IMAGE</p>
        <p className="flex-1 font-bold">NAME</p>
        <p className="flex-1 font-bold">CATEGORY/TYPE </p>
        <p className="flex-1 font-bold">AMOUNT</p>
        <div className=" flex-1">
          <select
            className="border rounded p-1 outline-none  cursor-pointer dark:bg-black bg-white"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="pending">Veg</option>
            <option value="completed">Non-Veg</option>
            <option value="price_asc">Amount ↑</option>
            <option value="price_desc">Amount ↓</option>
          </select>
        </div>
      </div>
      <FoodItem />
    </div>
  );
}
