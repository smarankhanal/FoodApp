import React, { useEffect } from "react";
import AnchorTag from "../AnchorTag";
import Button from "../Button";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import ChangeMode from "../mode/ChangeMode";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div
      className={` fixed top-0 left-1/2 transform -translate-x-1/2 w-full  max-w-5xl mx-auto  shadow-[1px_1px_1px_black] dark:shadow-[1px_1px_1px_white] bg-amber-400 p-3 m-3 rounded-lg z-999`}
    >
      <div className="flex items-center gap-10 h-[25px]">
        <Logo className={"h-8 w-8 "} />
        <AnchorTag className="font-bold  dark:text-gray-700" href={"/home"}>
          Home
        </AnchorTag>
        <ChangeMode />
        {user && (
          <>
            <AnchorTag
              href={"/fooditems"}
              className="font-bold  dark:text-gray-700"
            >
              FoodItem
            </AnchorTag>
            <AnchorTag
              href={"/order"}
              className="font-bold  dark:text-gray-700"
            >
              Order
            </AnchorTag>

            <AnchorTag href={"/user"} className="font-bold dark:text-gray-700">
              User
            </AnchorTag>
          </>
        )}

        {user ? (
          <Button
            className="h-[30px] inline-flex items-center justify-center ml-auto dark:text-white "
            onClick={() => handleLogout()}
          >
            LogOut
          </Button>
        ) : (
          <Button
            className="h-[30px] inline-flex items-center justify-center ml-auto dark:text-white "
            onClick={() => navigate("/login")}
          >
            LogIn
          </Button>
        )}
      </div>
    </div>
  );
}
