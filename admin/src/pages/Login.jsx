import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginAdmin } from "../store/adminAuthSlice";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, register } = useForm();
  const { token, error, loading } = useSelector((state) => state.auth);

  const submit = async (data) => {
    try {
      await dispatch(loginAdmin(data)).unwrap();
      navigate("/home"); // ✅ redirect to admin dashboard
    } catch (error) {
      console.log(error);
    }
  };

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <div className="w-full max-w-100 mx-auto bg-white dark:bg-black text-white mb-10 p-2 drop-shadow-[2px_2px_5px_black] dark:drop-shadow-[2px_2px_5px_#FCFEFF] rounded-lg mt-20">
      <div className="flex flex-col items-center justify-center">
        <Logo className="w-20 h-20" />
        <p className="font-bold text-black dark:text-white">Admin</p>
      </div>

      <form onSubmit={handleSubmit(submit)}>
        <Input label="Email:" {...register("email", { required: true })} />

        <div className="relative">
          <Input
            label="Password : "
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
          />
          <button
            type="button"
            className="absolute top-13 right-3 text-gray-500 hover:text-gray-700"
            onClick={toggleVisibility}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center">
            {error.message || "Login failed"}
          </p>
        )}

        <div className="flex items-center justify-center">
          <Button className="m-2 bg-blue-700" disabled={loading}>
            {loading ? "Logging in..." : "LogIn"}
          </Button>
        </div>
      </form>
    </div>
  );
}
