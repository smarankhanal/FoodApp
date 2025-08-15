import React, { useState } from "react";

import { Input, Button, Logo } from "../../components";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <>
      <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage pt-20">
        <div className="w-full  max-w-100 mx-auto bg-white dark:bg-black dark:text-white   mb-10 p-2 drop-shadow-[2px_2px_5px_black] dark:drop-shadow-[2px_2px_5px_#FCFEFF] rounded-lg">
          <div className="flex items-center justify-center">
            <Logo className="w-20 h-20" />
          </div>
          <div>
            <Input label="Email/Username :" />
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
              <Button className="m-2">LogIn</Button>
            </div>
            <div className="flex items-center justify-center">
              <p>
                Don't have an account?{" "}
                <span>
                  <a href="/" className="text-blue-400 font-semibold">
                    {" "}
                    Sign Up
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
