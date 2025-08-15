import React, { useState } from "react";
import { Button, Input } from "../../components";

import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage pt-18">
        <div className="w-full  max-w-110 mx-auto bg-white dark:bg-black dark:text-white   px-2 drop-shadow-[2px_2px_5px_black] dark:drop-shadow-[2px_2px_5px_#FCFEFF] rounded-lg">
          <div className="flex items-center justify-center">
            <p className="font-bold text-[20px] dark:text-white ">Register</p>
          </div>
          <div>
            <Input className="h-9" label="Email :" type="email" />
            <Input className="h-9" label="Username :" type="text" />
            <div className="relative">
              <Input
                className="h-9"
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
            <Input className="h-9" label="Full Name :" type="email" />
            <Input className="h-9" label="Phone Number :" type="number" />
            <Input className="h-9" label="Address :" type="text" />

            <div className="flex items-center justify-center">
              <Button className="m-2">Sign Up</Button>
            </div>
            <div className="flex items-center justify-center">
              <p>
                Already have an account?{" "}
                <span>
                  <a href="/" className="text-blue-400 font-semibold">
                    {" "}
                    Login
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
