import React, { useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
export default function Para() {
  return (
    <>
      <div
        className="relative flex flex-row items-center w-[300px] m-2 cursor-pointer"
        onClick={() => setShowAddress(true)}
      >
        <FaLocationDot className="mr-3" />
        <p className="flex-1">Address</p>
        <MdOutlineArrowForwardIos />
      </div>

      <hr className="mt-1 w-full  text-black h-1 inline-block dark:text-white mb-2" />

      <div className="flex flex-row items-center w-[300px] m-2 cursor-pointer">
        <FaUserCircle className="mr-3" />
        <p className="flex-1">User History</p>
        <MdOutlineArrowForwardIos />
      </div>
      <hr className="mt-1 w-full  text-black h-1 inline-block dark:text-white mb-2" />

      <div className="flex flex-row items-center w-[300px] m-2 cursor-pointer">
        <MdOutlinePayment className="mr-3" />
        <p className="flex-1">Payment</p>
        <MdOutlineArrowForwardIos />
      </div>
      <hr className="mt-1 w-full  text-black h-1 inline-block dark:text-white mb-2" />

      <div className="flex flex-row items-center w-[300px] m-2 cursor-pointer">
        <BsFillQuestionCircleFill className="mr-3" />
        <p className="flex-1">Help & Support</p>
        <MdOutlineArrowForwardIos />
      </div>
      <hr className="mt-1 w-full  text-black h-1 inline-block dark:text-white mb-2" />

      <div className="flex flex-row items-center w-[300px] m-2 cursor-pointer">
        <IoSettingsSharp className="mr-3" />
        <p className="flex-1">Settings</p>
        <MdOutlineArrowForwardIos />
      </div>
      <hr className="mt-1 w-full  text-black h-1 inline-block dark:text-white mb-2" />
    </>
  );
}
