import React from "react";
import { Search, SingleFoodItems } from "../components";
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
        <p className="flex-1/4 font-bold">IMAGE</p>
        <p className="flex-1/4 font-bold">NAME</p>
        <p className="flex-1/4 font-bold">CATEGORY/TYPE </p>
        <p className="flex-1/4 font-bold mr-18">AMOUNT</p>
      </div>
      <SingleFoodItems />
    </div>
  );
}
