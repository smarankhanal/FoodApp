import React from "react";
import Logo from "../Logo";
import { FaClipboardList } from "react-icons/fa6";

export default function NoOrder() {
  return (
    <div className="flex  flex-col items-center justify-center">
      <Logo className={"h-25 w-25"} />
      <div className="flex flex-row items-center justify-center text-2xl">
        <FaClipboardList className="dark:text-white mr-4 " />
        <p className="font-semibold dark:text-white">No orders yet...</p>
      </div>
    </div>
  );
}
