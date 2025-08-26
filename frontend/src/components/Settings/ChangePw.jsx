import React, { useState } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Input from "../Input";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { changePassword } from "../../store/passwordSlice";
export default function ChangePw() {
  const [show, setShow] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const OldToggleVisibility = () => setShowOldPassword((prev) => !prev);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const toggleVisibility = () => setShowNewPassword((prev) => !prev);

  const dispatch = useDispatch();
  const onChangePassword = (data) => {
    dispatch(changePassword(data));
    reset();
  };
  return (
    <>
      <div className="flex justify-center items-center  bg-white dark:bg-black rounded-lg  dark:drop-shadow-[1px_1px_1px_white]  drop-shadow-[2px_2px_1px_black] p-2 m-2 ">
        <p className="font-bold h-10 flex-1">Change Password</p>
        {show ? (
          <IoIosArrowDropdownCircle
            className="text-[20px] cursor-pointer "
            onClick={() => setShow(false)}
          />
        ) : (
          <IoIosArrowDroprightCircle
            className="text-[20px] cursor-pointer"
            onClick={() => setShow(true)}
          />
        )}
      </div>
      {show ? (
        <div className="dark:bg-black bg-white opacity-70 dark:text-white text-black p-3 rounded-lg">
          <form onSubmit={handleSubmit(onChangePassword)}>
            <div className="relative w-full mb-2">
              <Input
                className="m-2 border border-gray-300  hover:border-amber-400 focus:ring-2  focus:ring-amber-400"
                placeholder="Enter the old password..."
                type={showOldPassword ? "text" : "password"}
                {...register("oldPassword")}
                autoComplete="off"
              />
              <button
                type="button"
                className="absolute top-5 right-3 text-gray-500 hover:text-gray-700"
                onClick={toggleVisibility}
              >
                {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <div className="relative w-full mb-2">
              <Input
                className="m-2 border border-gray-300  hover:border-amber-400 focus:ring-2  focus:ring-amber-400"
                placeholder="Enter the new password..."
                type={showPassword ? "text" : "password"}
                {...register("newPassword")}
              />
              <button
                type="button"
                className="absolute top-5 right-3 text-gray-500 hover:text-gray-700"
                onClick={toggleVisibility}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <Button
                className="bg-gray-950 dark:bg-white dark:text-black hover:bg-gray-950 dark:hover:bg-white  hover:opacity-75"
                type="submit"
              >
                Change
              </Button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
