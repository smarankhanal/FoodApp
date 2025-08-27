import React, { useState } from "react";
import { Button, Input } from "../../components";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/registerSlice";
import { useForm } from "react-hook-form";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const { error } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      fullname: "",
      phoneNumber: "",
      address: "",
    },
  });
  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const getError = (field) => {
    if (!error && error.length === 0) return null;
    const errObj = error.find((e) => e.field === field);
    return errObj?.message || null;
  };
  const submit = async (data) => {
    try {
      await dispatch(registerUser({ userData: data })).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:");
    }
  };
  return (
    <>
      <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage pt-18">
        <div className="w-full  max-w-110 mx-auto bg-white dark:bg-black dark:text-white   px-2 drop-shadow-[2px_2px_5px_black] dark:drop-shadow-[2px_2px_5px_#FCFEFF] rounded-lg">
          <div className="flex items-center justify-center">
            <p className="font-bold text-[20px] dark:text-white ">Register</p>
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <Input
                className="h-9"
                label="Email :"
                type="email"
                {...register("email", { required: true })}
              />
              {getError("email") && (
                <p className="text-red-500 text-sm text-center">
                  {getError("email")}
                </p>
              )}
            </div>
            <div>
              <Input
                className="h-9"
                label="Username :"
                type="text"
                {...register("username", { required: true })}
              />
              {getError("username") && (
                <p className="text-red-500 text-sm text-center">
                  {getError("username")}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <Input
                  className="h-9"
                  label="Password : "
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  className="absolute top-10 right-3 text-gray-500 hover:text-gray-700"
                  onClick={toggleVisibility}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {getError("password") && (
                <p className="text-red-500 text-sm text-center">
                  {getError("password")}
                </p>
              )}
            </div>
            <div>
              <Input
                className="h-9"
                label="Full Name :"
                type="text"
                {...register("fullname", { required: true })}
              />
              {getError("fullname") && (
                <p className="text-red-500 text-sm text-center">
                  {getError("fullname")}
                </p>
              )}
            </div>
            <div>
              <Input
                className="h-9 
             [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none"
                label="Phone Number :"
                type="number"
                {...register("phoneNumber", { required: true })}
              />
              {getError("phoneNumber") && (
                <p className="text-red-500 text-center">
                  {getError("phoneNumber")}
                </p>
              )}
            </div>
            <div>
              <Input
                className="h-9"
                label="Address :"
                type="text"
                {...register("address", { required: true })}
              />
              {getError("address") && (
                <p className="text-red-500 text-sm">{getError("address")}</p>
              )}
            </div>
            <div>
              {getError("general") && (
                <p className="text-red-500 text-sm text-center font-bold">
                  {getError("general")}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center">
              <Button className="m-2" type="submit">
                Sign Up
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <p>
                Already have an account?{" "}
                <span>
                  <Link to="/login" className="text-blue-400 font-semibold">
                    {" "}
                    Login
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
