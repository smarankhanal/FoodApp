import React, { useState } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
export default function Single({ text, href = "/", children }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="bg-black dark:bg-white dark:text-black text-white p-2 rounded w-[150px] font-bold dark:drop-shadow-[1px_1px_5px_white] drop-shadow-[1px_1px_5px_black] flex items-center justify-center cursor-pointer my-5">
        <a href={href} className="flex-1 hover:scale-[1.03]">
          {text}
        </a>
        <div className="flex justify-center items-center">
          {show ? (
            <FaArrowDown
              className="text-[20px] cursor-pointer "
              onClick={() => setShow(false)}
            />
          ) : (
            <FaArrowRight
              className="text-[20px] cursor-pointer"
              onClick={() => setShow(true)}
            />
          )}
        </div>
      </div>

      {show ? (
        <div className="w-[200px] bg-black/70 text-white dark:text-black dark:bg-white/70 mx-1 mt-1 rounded-lg p-2 font-semibold">
          {children}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
