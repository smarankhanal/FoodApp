import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, closeMenu } from "../../store/menuSlice";
import AnchorTag from "../AnchorTag";
import Button from "../Button";
import Logo from "../Logo";
import ChangeMode from "../mode/ChangeMode";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/authSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { menuOpen } = useSelector((state) => state.menu);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(closeMenu());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleRegister = () => {
    navigate("/register");
    dispatch(closeMenu());
  };

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-full h-12 bg-amber-400 shadow-md dark:shadow-white/20 z-[999] rounded-lg p-3">
      <div className="flex items-center justify-between h-full">
        <Logo className="h-full w-auto max-h-10" />

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-6">
          <AnchorTag href="/home" className="font-bold dark:text-gray-700">
            Home
          </AnchorTag>
          <ChangeMode />

          {user && (
            <>
              <AnchorTag
                href="/fooditems"
                className="font-bold dark:text-gray-700"
              >
                FoodItem
              </AnchorTag>
              <AnchorTag href="/order" className="font-bold dark:text-gray-700">
                Order
              </AnchorTag>
              <AnchorTag href="/user" className="font-bold dark:text-gray-700">
                User
              </AnchorTag>
            </>
          )}

          {user ? (
            <Button
              className="h-8 px-3 text-sm dark:text-white"
              onClick={handleLogout}
            >
              LogOut
            </Button>
          ) : (
            <>
              <Button
                className="h-8 px-3 text-sm dark:text-white"
                onClick={() => navigate("/login")}
              >
                LogIn
              </Button>
              <Button
                className="h-8 px-3 text-sm dark:text-white bg-red-500 hover:bg-red-300"
                onClick={handleRegister}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden text-black dark:text-white text-2xl"
          onClick={() => dispatch(toggleMenu())}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu content */}
      {menuOpen && (
        <div className="sm:hidden mt-2 flex flex-col gap-3 bg-amber-300 dark:bg-amber-500 p-3 rounded-lg shadow-md">
          <AnchorTag
            href="/home"
            className="font-bold dark:text-gray-800"
            onClick={() => dispatch(closeMenu())}
          >
            Home
          </AnchorTag>

          <ChangeMode />

          {user && (
            <>
              <AnchorTag
                href="/fooditems"
                className="font-bold dark:text-gray-800"
                onClick={() => dispatch(closeMenu())}
              >
                FoodItem
              </AnchorTag>
              <AnchorTag
                href="/order"
                className="font-bold dark:text-gray-800"
                onClick={() => dispatch(closeMenu())}
              >
                Order
              </AnchorTag>
              <AnchorTag
                href="/user"
                className="font-bold dark:text-gray-800"
                onClick={() => dispatch(closeMenu())}
              >
                User
              </AnchorTag>
            </>
          )}

          {user ? (
            <Button
              className="h-8 px-3 text-sm dark:text-white"
              onClick={handleLogout}
            >
              LogOut
            </Button>
          ) : (
            <>
              <Button
                className="h-8 px-3 text-sm dark:text-white"
                onClick={() => {
                  navigate("/login");
                  dispatch(closeMenu());
                }}
              >
                LogIn
              </Button>
              <Button
                className="h-8 px-3 text-sm dark:text-white bg-red-500 hover:bg-red-300"
                onClick={handleRegister}
              >
                Register
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
