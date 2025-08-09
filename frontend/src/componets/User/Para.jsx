import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

export default function Para({ logo: Logo, text }) {
  return (
    <>
      <div className="flex flex-row items-center w-[300px] ">
        <Logo className="mr-3" />
        <p className="flex-1">{text}</p>
        <MdOutlineArrowForwardIos className="cursor-pointer" />
      </div>
      <hr className="mt-1 w-full  text-black h-1 inline-block dark:text-white mb-2" />
    </>
  );
}
