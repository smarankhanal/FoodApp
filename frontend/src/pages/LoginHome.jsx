import React from "react";
import { Button, Logo } from "../components";
import { useNavigate } from "react-router-dom";

export default function LoginHome() {
  const navigate = useNavigate();
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bgImage">
      <div className="py-20 px-20 dark:text-white text-black font-semibold">
        <div className="flex align-center justify-center">
          <Logo className="h-30 w-30 " />
        </div>
        <p className="text-[20px] font-bold text-center">
          Welcome to FoodEase — Your Ultimate Food Ordering Companion!
        </p>

        <p className="m-4 opacity-80">
          Discover a wide variety of delicious meals right at your fingertips.
          Whether you're craving a hearty main course, fresh vegetarian dishes,
          or quick snacks, FoodEase makes ordering easy, fast, and reliable.
          Browse menus, customize your orders, and enjoy tasty food delivered
          straight to your door. Experience the joy of hassle-free dining with
          FoodEase today!
        </p>
        <div className="flex align-center justify-center">
          <Button className="w-20" onClick={() => navigate("/fooditems")}>
            Order
          </Button>
        </div>
      </div>
    </div>
  );
}
