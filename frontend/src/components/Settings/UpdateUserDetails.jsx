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

export default function Update() {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: user,
  });

  const update = (data) => {
    dispatch(updateDetails(data));
    setToast({
      show: true,
      text: "Details updated successfully",
      className: "text-green-800 w-[450px]",
    });
    setTimeout(() => setToast({ show: false, text: "" }), 3000);
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
      <div className="flex justify-center items-center  bg-white dark:bg-black rounded-lg  dark:drop-shadow-[1px_1px_1px_white]  drop-shadow-[2px_2px_1px_black] p-2 m-2 ">
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
        <div className="dark:bg-black bg-white opacity-70 dark:text-white text-black p-3 rounded-lg">
          <form onSubmit={handleSubmit(update)}>
            <label>Email :- </label>
            <Input
              className="m-2 border border-gray-300  hover:border-amber-400  focus:ring-2 focus:ring-amber-400"
              defaultValue={user.email}
              {...register("email")}
            />
            <label>Username :-</label>
            <Input
              className="m-2 border border-gray-300  hover:border-amber-400 focus:ring-2  focus:ring-amber-400"
              defaultValue={user.username}
              {...register("username")}
            />
            <label>Fullname :- </label>
            <Input
              className="m-2 border border-gray-300  hover:border-amber-400  focus:ring-2 focus:ring-amber-400"
              defaultValue={user.fullname}
              {...register("fullname")}
            />
            <label>Phone number :-</label>
            <Input
              className="m-2 border border-gray-300  hover:border-amber-400 focus:ring-2  focus:ring-amber-400"
              defaultValue={user.phoneNumber}
              {...register("phoneNumber")}
            />
            <label>Address :-</label>
            <Input
              className="m-2 border border-gray-300  hover:border-amber-400 focus:ring-2  focus:ring-amber-400"
              defaultValue={user.address}
              {...register("address")}
            />
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
