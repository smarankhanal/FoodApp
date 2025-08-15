import React from "react";
import { Button, ChangePw, Update } from "../components";

export default function Settings() {
  return (
    <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage pt-20 font-serif  text-black dark:text-white">
      <p className="font-bold text-3xl text-center">Settings</p>
      <div className="w-full max-w-3xl mx-auto">
        <Update />
        <ChangePw />
        <div className="flex justify-center items-center  bg-white dark:bg-black rounded-lg  dark:drop-shadow-[1px_1px_1px_white]  drop-shadow-[2px_2px_1px_black] p-2 m-2 ">
          <p className="font-bold flex-1">Mode</p>
          <Button className="bg-gray-950 dark:bg-white dark:text-black hover:bg-gray-950 dark:hover:bg-white  hover:opacity-75">
            Switch Mode
          </Button>
        </div>
        <div className="flex items-center justify-center mt-10">
          <Button className="bg-red-600 hover:bg-red-600 hover:opacity-50">
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
