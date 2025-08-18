import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Para from "./Para";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className=" relative mb-10 flex-col flex items-center justify-center font-serif">
      <div className="flex items-center justify-center w-15 h-15 rounded-full border-4 border-amber-600">
        <FaUserCircle className="w-12 h-12 text-gray-700 dark:text-gray-300" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="m-1 text-black dark:text-white text-2xl font-bold">
          {user.username}
        </p>
        <p className="m-1 text-black dark:text-white text-2xl font-bold">
          {user.fullname}
        </p>
        <p className=" text-black dark:text-white">{user.email}</p>
        <p className=" text-black dark:text-white">{user.phoneNumber}</p>
      </div>
      <div className=" flex flex-col items-center justify-center mt-15 dark:text-white  opacity-70 dark:opacity-100">
        <Para />
      </div>
    </div>
  );
}
