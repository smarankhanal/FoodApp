import React from "react";
import { IoSearchCircle } from "react-icons/io5";

export default function Search({ className = "", value, onChange }) {
  return (
    <div className="flex justify-center w-full px-4 mb-5">
      <div className="relative flex items-center w-full sm:w-[400px]">
        <input
          type="text"
          className={`border-1 bg-amber-100 rounded-lg px-3 py-2 focus:outline-none border-blue-500 text-black focus:border-2 w-full ${className}`}
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
        <IoSearchCircle className="absolute right-2 text-[32px] sm:text-[40px] text-blue-500 hover:cursor-pointer" />
      </div>
    </div>
  );
}
