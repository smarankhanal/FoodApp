import React from "react";
import { IoSearchCircle } from "react-icons/io5";

export default function Search({ className = "", value, onChange }) {
  return (
    <div className="flex justify-center w-full px-4 mb-5">
      <div className="relative flex items-center ">
        <input
          type="text"
          className={`border-1 bg-amber-100 rounded-lg px-2 py-1 focus:outline-none border-blue-500 text-black  focus:border-2 w-[400px] ${className}`}
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
        <IoSearchCircle className="absolute right-2 text-[40px] text-blue-500 hover:cursor-pointer" />
      </div>
    </div>
  );
}
