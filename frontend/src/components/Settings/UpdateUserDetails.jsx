import React, { useState } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import Input from "../Input";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../store/updateSlice";
import { useForm } from "react-hook-form";
import Toast from "../Toast";
import { getMe } from "../../store/authSlice";

export default function Update() {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.update);
  const [toast, setToast] = useState({ show: false, text: "", className: "" });
  const dispatch = useDispatch();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: user,
  });

  const update = async (data) => {
    try {
      await dispatch(updateDetails(data)).unwrap();

      setToast({
        show: true,
        text: "Details updated successfully",
        className: "text-green-600 sm:w-[450px] font-bold",
      });

      reset(data);
      setShow(false);
      dispatch(getMe());
    } catch (err) {
      console.log(err);
      setToast({
        show: true,
        text: err.message || "Failed to update details",
        className: "text-red-600 sm:w-[450px] font-bold",
      });
    } finally {
      setTimeout(() => setToast({ show: false, text: "" }), 3000);
    }
  };
  const getError = (field) => {
    if (!error || error?.length == 0) return null;
    const errObj = error?.find((e) => e.field === field);
    return errObj?.message;
  };

  return (
    <>
      {toast.show && (
        <Toast
          show={toast.show}
          text={toast.text}
          className={toast.className}
        />
      )}
      <div className="flex justify-center items-center  bg-white dark:bg-black rounded-lg  dark:drop-shadow-[1px_1px_1px_white]  drop-shadow-[2px_2px_1px_black] p-2 m-2">
        <p className="font-bold h-10 flex-1">Update your details</p>
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
        <div className="dark:bg-black bg-white dark:text-white text-black p-3 rounded-lg">
          <form onSubmit={handleSubmit(update)}>
            <label className="opacity-70">Email :- </label>
            <div>
              <Input
                className="m-2 border border-gray-300  hover:border-amber-400  focus:ring-2 focus:ring-amber-400"
                {...register("email")}
              />
              {getError("email") && (
                <p className="text-red-500 text-sm text-center">
                  {getError("email")}
                </p>
              )}
            </div>

            <label className="opacity-70">Username :-</label>
            <div>
              <Input
                className="m-2 border border-gray-300  hover:border-amber-400  focus:ring-2 focus:ring-amber-400"
                {...register("username")}
              />
              {getError("username") && (
                <p className="text-red-500 text-sm text-center">
                  {getError("username")}
                </p>
              )}
            </div>

            <label className="opacity-70">Fullname :- </label>
            <div>
              <Input
                className="m-2 border border-gray-300  hover:border-amber-400  focus:ring-2 focus:ring-amber-400"
                {...register("fullname")}
              />
              {getError("email") && (
                <p className="text-red-500 text-sm text-center">
                  {getError("fullname")}
                </p>
              )}
            </div>

            <label className="opacity-70">Phone number :-</label>
            <div>
              <Input
                className="m-2 border border-gray-300  hover:border-amber-400  focus:ring-2 focus:ring-amber-400"
                {...register("phoneNumber")}
              />
              {getError("phoneNumber") && (
                <p className="text-red-500 text-sm text-center">
                  {getError("phoneNumber")}
                </p>
              )}
            </div>

            <label className="opacity-70">Address :-</label>
            <div>
              <Input
                className="m-2 border border-gray-300  hover:border-amber-400  focus:ring-2 focus:ring-amber-400"
                {...register("address")}
              />
              {getError("email") && (
                <p className="text-red-500 text-sm text-center">
                  {getError("address")}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <Button className="bg-gray-950 dark:bg-white dark:text-black hover:bg-gray-950 dark:hover:bg-white  hover:opacity-75">
                Update
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
