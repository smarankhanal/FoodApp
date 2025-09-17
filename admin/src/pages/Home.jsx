import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="dark:text-black text-white mt-10 p-4 flex justify-center pl-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-20 justify-items-center">
        {/* Users Card */}
        <div
          className="h-36 sm:h-52 w-36 sm:w-[200px] dark:bg-white bg-black flex flex-col items-center justify-center rounded-lg text-amber-600 font-serif shadow-md cursor-pointer"
          onClick={() => navigate("/user")}
        >
          <FaUserFriends className="text-5xl sm:text-[70px] text-amber-500" />
          <p className="font-bold text-xl sm:text-2xl pt-4">User's</p>
        </div>

        {/* FoodItems Card */}
        <div
          className="h-36 sm:h-52 w-36 sm:w-[200px] dark:bg-white bg-black flex flex-col items-center justify-center rounded-lg text-amber-600 font-serif shadow-md cursor-pointer"
          onClick={() => navigate("/fooditem")}
        >
          <GiForkKnifeSpoon className="text-5xl sm:text-[70px] text-amber-500" />
          <p className="font-bold text-xl sm:text-2xl pt-4">FoodItems</p>
        </div>

        {/* Order Card */}
        <div
          className="h-36 sm:h-52 w-36 sm:w-[200px] dark:bg-white bg-black flex flex-col items-center justify-center rounded-lg text-amber-600 font-serif shadow-md cursor-pointer"
          onClick={() => navigate("/order")}
        >
          <FaClipboardList className="text-5xl sm:text-[70px] text-amber-500" />
          <p className="font-bold text-xl sm:text-2xl pt-4">Order</p>
        </div>
      </div>
    </div>
  );
}
