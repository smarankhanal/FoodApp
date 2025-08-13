import React from "react";
import { TiUserDelete } from "react-icons/ti";
import { FaClipboardList } from "react-icons/fa";
import Status from "./Status";

export default function SingleUser() {
  return (
    <>
      <div className="flex-1 bg-black dark:bg-white rounded-lg m-4 p-2 dark:text-black  text-white flex items-center">
        <p className="flex-1">User Id :</p>
        <p className="flex-1">Nameassssss ssssssssssssssss </p>

        <Status className="text-green-500 drop-shadow-[2px_2px_green]">
          Active
        </Status>
        <p className="flex-1">Date</p>

        <div className="flex flex-1">
          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03] mr-3"
            title="User History"
          >
            <FaClipboardList className=" text-[18px] text-amber-500" />
          </div>

          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03]"
            title="Delete User"
          >
            <TiUserDelete className="text-red-600 text-[18px]" />
          </div>
        </div>
      </div>
    </>
  );
}
