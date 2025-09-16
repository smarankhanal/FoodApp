import React from "react";
import { Button, Logo } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LoginHome() {
  const navigate = useNavigate();
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bg-cover bg-center min-h-screen flex items-center">
      <div
        className={`w-full ${
          menuOpen ? "mt-70" : ""
        } sm:mt-10 py-10 px-6 sm:px-10 lg:px-20 dark:text-white text-black font-semibold`}
      >
        <div className="flex items-center justify-center">
          <Logo className="h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32" />
        </div>

        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-center mt-6">
          Welcome to FoodEase — Your Ultimate Food Ordering Companion!
        </p>

        <p className="mt-4 opacity-80 text-center text-sm sm:text-base ">
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
            onClick={() => navigate("/fooditems")}
          >
            Order
          </Button>
        </div>
      </div>
    </div>
  );
}
