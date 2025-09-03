import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function UserDetails() {
  const { user } = useSelector((state) => state.singleUser);
  return (
    <div className=" flex-1 flex-col flex items-center justify-center font-serif">
      <div className="flex items-center justify-center w-15 h-15 rounded-full border-4 border-amber-600">
        <FaUserCircle className="w-12 h-12 text-gray-700 dark:text-gray-300" />
      </div>
      <div className="flex flex-col items-center justify-center dark:text-white text-black">
        <p className="m-1 text-black dark:text-white text-2xl font-bold">
          {user.fullname}
        </p>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.phoneNumber}</p>
        <div className="mt-2 text-center">
          <p className="opacity-80 mb-4">{user.address}</p>
          <a
            href={`https://www.google.com/maps?q=${user.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow transition duration-200"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
