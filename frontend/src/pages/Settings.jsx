import React from "react";
import { Button, ChangeMode, ChangePw, Update } from "../components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/authSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage pt-20 font-serif  text-black dark:text-white px-4">
      <p className="font-bold text-3xl text-center ">Settings</p>
      <div className="w-full max-w-3xl mx-auto">
        <Update />
        <ChangePw />
        <div className="flex justify-center items-center  bg-white dark:bg-black rounded-lg  dark:drop-shadow-[1px_1px_1px_white]  drop-shadow-[2px_2px_1px_black] p-2 m-2 ">
          <p className="font-bold flex-1">Mode</p>
          <ChangeMode />
        </div>
        <div className="flex items-center justify-center mt-10">
          <Button
            onClick={() => handleLogout()}
            className="bg-red-600 hover:bg-red-600 hover:opacity-50"
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
