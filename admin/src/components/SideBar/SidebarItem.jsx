import React, { useState } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function SidebarItem({ text, href = "/", children }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="bg-black dark:bg-white dark:text-black text-white p-2 rounded w-[100px] sm:w-[150px] font-bold shadow-[2px_2px_1px_blue] flex items-center justify-center cursor-pointer my-5">
        <Link
          to={href}
          className="text-[12px] sm:text-[16px] flex-1 hover:scale-[1.03] focus:opacity-45"
        >
          {text}
        </Link>
        <div className="flex justify-center items-center">
          {show ? (
            <FaArrowDown
              className="text-[12px] sm:text-[20px] cursor-pointer "
              onClick={() => setShow(false)}
            />
          ) : (
            <FaArrowRight
              className="text-[12px] sm:text-[20px] cursor-pointer"
              onClick={() => setShow(true)}
            />
          )}
        </div>
      </div>

      {show ? (
        <div className="w-[100px]  sm:w-[200px] text-[10px] sm:text-[20px] bg-black/70 text-white dark:text-black dark:bg-white/70 mx-1 mt-1 rounded-lg p-2 font-semibold">
          {children}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
