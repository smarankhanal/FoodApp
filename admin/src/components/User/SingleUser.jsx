import React, { useEffect } from "react";
import { TiUserDelete } from "react-icons/ti";
import { FaClipboardList } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

import Status from "../Status";

export default function SingleUser({ user }) {
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <>
      <div className="flex-1 bg-black dark:bg-white rounded-lg m-4 p-2 dark:text-black  text-white flex items-center">
        <p className="flex-1 text-sm truncate">{user._id}</p>
        <p className="flex-1 ml-5">{user.username} </p>
        <div className="flex-1">
          <Status className="text-green-500 drop-shadow-[2px_2px_green]">
            Active
          </Status>
        </div>

        <p className="flex-1">
          {new Date(user.createdAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

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
          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03] ml-3"
            title="View user details"
          >
            <FaRegEye className="text-blue-600 text-[18px]" />
          </div>
        </div>
      </div>
    </>
  );
}
