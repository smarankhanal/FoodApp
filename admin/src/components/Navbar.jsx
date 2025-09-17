import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../store/adminAuthSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/login");
  };
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="flex  items-center sm:w-full w-[300px] mx-auto max-w-4xl dark:bg-white bg-black rounded-lg shadow-[1px_1px_1px_white]  dark:shadow-[1px_1px_1px_black]  h-[50px] ">
      <div className="p-2 flex-1">
        <Logo />
      </div>
      <div className="p-2">
        {token && (
          <Button
            className=" dark:bg-black  bg-white text-black dark:text-white"
            onClick={() => handleLogout()}
          >
            LogOut
          </Button>
        )}
      </div>
    </div>
  );
}
