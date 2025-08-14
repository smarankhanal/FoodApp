import React from "react";
import Input from "./Input";
import Button from "./Button";
import { MdOutlineAdd } from "react-icons/md";
import Select from "./Select";
export default function FoodManager() {
  return (
    <div className=" w-full max-w-2xl mx-auto font-serif p-4 rounded-lg">
      <Input label="FoodItem : " type="text" />
      <Input
        label="Image :"
        type="file"
        accept="image/*"
        className=" 
     [&::file-selector-button]:bg-blue-600
    [&::file-selector-button]:text-white
    [&::file-selector-button]:border-none
    [&::file-selector-button]:px-4
    [&::file-selector-button]:py-2
    [&::file-selector-button]:rounded-md
    [&::file-selector-button]:cursor-pointer
    [&::file-selector-button]:hover:bg-blue-700 "
      />
      <Input label="Description" type="text" />
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <Select label="Type" className="bg-gray-300 text-black">
            <option>Veg</option>
            <option>Non-veg</option>
          </Select>
        </div>
        <div className="flex-1">
          <Select label="Sub Category" className="bg-gray-300 text-black">
            <option>Starter</option>
            <option>Main Course</option>
            <option>Dessert</option>
            <option>Beverage</option>
          </Select>
        </div>
      </div>
      <Input label="Amount" type="text" />
      <Button className=" dark:bg-blue-700  bg-blue-600 text-white  w-[100px] flex items-center justify-center gap-1 mt-2 ml-auto">
        Add
        <MdOutlineAdd />
      </Button>
    </div>
  );
}
