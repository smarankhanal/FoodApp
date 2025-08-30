import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className=" dark:text-black text-white  mt-10 ml-5 p-4 flex-1 max-w-fit max-h-fit">
      <div className="grid grid-cols-3 gap-20 pl-20">
        <div
          className="h-[200px] w-[200px] dark:bg-white bg-black flex flex-col items-center justify-center rounded-lg text-amber-600 font-serif shadow-[2px_2px_1px_blue]"
          onClick={() => navigate("/user")}
        >
          <FaUserFriends className="text-[70px]  text-amber-500 cursor-pointer" />
          <p className="font-bold text-2xl pt-4 ">User's</p>
        </div>

        <div
          className="h-[200px] w-[200px] dark:bg-white bg-black flex flex-col items-center justify-center rounded-lg text-amber-600 font-serif shadow-[2px_2px_1px_blue]"
          onClick={() => navigate("/fooditem")}
        >
          <GiForkKnifeSpoon className="text-[70px]  text-amber-500 cursor-pointer" />
          <p className="font-bold text-2xl pt-4 ">FoodItems</p>
        </div>

        <div
          className="h-[200px] w-[200px] dark:bg-white bg-black flex flex-col items-center justify-center rounded-lg text-amber-600 font-serif shadow-[2px_2px_1px_blue]"
          onClick={() => navigate("/order")}
        >
          <FaClipboardList className="text-[70px] text-amber-500 cursor-pointer" />
          <p className="font-bold text-2xl pt-4 ">Order</p>
        </div>
      </div>
    </div>
  );
}
