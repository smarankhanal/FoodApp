import React from "react";
import { Button, Logo } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../store/menuSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = () => {
    navigate("/login");
    dispatch(closeMenu());
  };
  return (
    <div className="relative bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-3xl py-10 px-6 sm:px-10 lg:px-20 dark:text-white text-black font-semibold text-center">
        <div className="flex items-center justify-center">
          <Logo className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32" />
        </div>

        <p className="mt-6 font-bold sm:text-base lg:text-xl">
          Welcome to FoodEase — Your Ultimate Food Ordering Companion!
        </p>

        <p className="mt-4 opacity-80 text-sm sm:text-base ">
          Discover a wide variety of delicious meals right at your fingertips.
          Whether you're craving a hearty main course, fresh vegetarian dishes,
          or quick snacks, FoodEase makes ordering easy, fast, and reliable.
          Browse menus, customize your orders, and enjoy tasty food delivered
          straight to your door. Experience the joy of hassle-free dining with
          FoodEase today!
        </p>

        <div className="flex items-center justify-center mt-6">
          <Button
            className="w-full sm:w-auto px-6 py-2 text-base sm:text-lg"
            onClick={() => loginUser()}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
