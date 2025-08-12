import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

import Status from "./Status";
export default function SingleOrder() {
  return (
    <>
      <div className="bg-black dark:bg-white rounded-lg m-4 p-2 dark:text-black  text-white flex items-center">
        <div className="flex flex-1">
          <p className="flex-1/4">Order Id :</p>
          <p className="flex-1/4">Nameasssssssss </p>

          <Status className="text-amber-500 drop-shadow-[2px_2px_orange] ">
            Pending
          </Status>
          <p className="flex-1/4">20000</p>
        </div>

        <div className="flex">
          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03] mr-3"
            title="View Order"
          >
            <AiOutlineEye className=" text-[20px] text-amber-500" />
          </div>
          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03] mr-3"
            title="Edit Order Status"
          >
            <FaRegEdit className=" text-[18px] text-blue-500" />
          </div>
        </div>
      </div>
    </>
  );
}
