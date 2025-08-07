import React from "react";
import AnchorTag from "./AnchorTag";
import Button from "./Button";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <div
      className={` fixed top-0 left-1/2 transform -translate-x-1/2 w-full  max-w-5xl mx-auto  bg-amber-400 p-3 m-3 rounded-lg z-999`}
    >
      <div className="flex items-center gap-10 h-[25px]">
        <Logo className={"h-8 w-8 "} />
        <AnchorTag className="font-bold  dark:text-gray-500">Home</AnchorTag>
        <AnchorTag className="font-bold  dark:text-gray-500">Home</AnchorTag>
        <AnchorTag className="font-bold  dark:text-gray-500">Home</AnchorTag>

        <Button className="h-[30px] inline-flex items-center justify-center ml-auto dark:text-white font-normal">
          Login
        </Button>
      </div>
    </div>
  );
}
