import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function UserDetails() {
  return (
    <div className=" flex-1 flex-col flex items-center justify-center font-serif">
      <div className="flex items-center justify-center w-15 h-15 rounded-full border-4 border-amber-600">
        <FaUserCircle className="w-12 h-12 text-gray-700 dark:text-gray-300" />
      </div>
      <div className="flex flex-col items-center justify-center dark:text-white text-black">
        <p className="m-1 text-black dark:text-white text-2xl font-bold">
          Full Name
        </p>
        <p>Username</p>
        <p>Email</p>
        <p>Phone Number </p>
        <div className="mt-2 text-center">
          <p className="opacity-80">Bharatpur-10, Chitwan Nepal</p>
          <a
            href="https://www.google.com/maps?q=Bharatpur-10,Chitwan"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow transition duration-200"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
