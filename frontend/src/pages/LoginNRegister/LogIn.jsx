import React, { useState } from "react";
import { Input, Button, Logo } from "../../components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../store/authSlice";
export default function LogIn() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toggleVisibility = () => setShowPassword((prev) => !prev);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/home");
    } catch (err) {
      setErrorMessage(err.message || "Login failed ,please try again");
    }
  };
  return (
    <div className="bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bgImage pt-20">
      <div className="w-full max-w-100 mx-auto bg-white dark:bg-black dark:text-white mb-10 p-4 drop-shadow-[2px_2px_5px_black] dark:drop-shadow-[2px_2px_5px_#FCFEFF] rounded-lg">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col items-center"
        >
          <Logo className="w-20 h-20 mb-4" />

          <Input
            label="Email/Username :"
            type="text"
            className="mb-4"
            {...register("identifier", { required: true })}
          />

          <div className="relative w-full mb-4">
            <Input
              label="Password :"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
              })}
            />
            <button
              type="button"
              className="absolute top-10 right-3 text-gray-500 hover:text-gray-700"
              onClick={toggleVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 mb-5  font-semibold">{errorMessage}</p>
          )}
          <Button type="submit" className="w-full mb-4">
            LogIn
          </Button>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
