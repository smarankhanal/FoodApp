import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { adminLogout } from "../store/adminAuthSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(adminLogout());
  };
  return (
    <div className="flex  items-center w-full mx-auto max-w-4xl dark:bg-white bg-black rounded-lg shadow-[1px_1px_1px_white]  dark:shadow-[1px_1px_1px_black]  h-[50px] ">
      <div className="p-2 flex-1">
        <Logo />
      </div>
      <div className="p-2">
        <Button
          className=" dark:bg-black  bg-white text-black dark:text-white"
          onClick={() => handleLogout()}
        >
          LogOut
        </Button>
      </div>
    </div>
  );
}
