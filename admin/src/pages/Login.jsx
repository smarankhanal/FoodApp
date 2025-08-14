import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);
  return (
    <>
      <div className="w-full  max-w-100 mx-auto bg-white dark:bg-black dark:text-white   mb-10 p-2 drop-shadow-[2px_2px_5px_black] dark:drop-shadow-[2px_2px_5px_#FCFEFF] rounded-lg mt-20">
        <div className="flex flex-col items-center justify-center">
          <Logo className="w-20 h-20" />
          <p className="font-bold">Admin</p>
        </div>
        <div>
          <Input label="Email:" />
          <div className="relative">
            <Input
              label="Password : "
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute top-10 right-3 text-gray-500 hover:text-gray-700"
              onClick={toggleVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <Button className="m-2 bg-blue-700">LogIn</Button>
          </div>
        </div>
      </div>
    </>
  );
}
