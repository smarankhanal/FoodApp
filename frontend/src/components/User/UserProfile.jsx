import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Para from "./Para";

export default function UserProfile() {
  return (
    <div className=" relative mb-10 flex-col flex items-center justify-center font-serif">
      <div className="flex items-center justify-center w-15 h-15 rounded-full border-4 border-amber-600">
        <FaUserCircle className="w-12 h-12 text-gray-700 dark:text-gray-300" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="m-1 text-black dark:text-white text-2xl font-bold">
          Full Name
        </p>
        <p className=" text-black dark:text-white">Email</p>
        <p className=" text-black dark:text-white">Phone Number</p>
      </div>
      <div className=" flex flex-col items-center justify-center mt-15 dark:text-white  opacity-70 dark:opacity-100">
        <Para />
      </div>
    </div>
  );
}
