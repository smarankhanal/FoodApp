import React from "react";
import { IoSearchCircle } from "react-icons/io5";

export default function Search({ className = "", value, onChange }) {
  return (
    <div className="flex justify-center w-full px-4 mb-5">
      <div className="relative flex items-center w-full max-w-full sm:max-w-md">
        <input
          type="text"
          className={`border bg-amber-100 rounded-lg px-3 py-2 focus:outline-none border-blue-500 focus:border-2 w-full text-sm sm:text-base ${className}`}
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
        <IoSearchCircle className="absolute right-2 text-xl sm:text-2xl text-blue-500 cursor-pointer" />
      </div>
    </div>
  );
}
