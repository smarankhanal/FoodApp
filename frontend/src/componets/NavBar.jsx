import React from "react";
import AnchorTag from "./AnchorTag";
import Button from "./Button";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <div
      className={`w-full max-w-5xl mx-auto  bg-amber-400 p-3 m-3 rounded-lg`}
    >
      <div className="flex gap-10">
        <AnchorTag className="font-bold  dark:text-white">Home</AnchorTag>
        <AnchorTag className="font-bold  dark:text-white">Home</AnchorTag>
        <AnchorTag className="font-bold  dark:text-white">Home</AnchorTag>

        <Button className="h-[30px] inline-flex items-center justify-center ml-auto dark:text-white">
          LogIn
        </Button>
      </div>
    </div>
  );
}
