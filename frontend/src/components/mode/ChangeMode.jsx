import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../../store/modeSlice";
import Button from "../Button";
import { closeMenu } from "../../store/menuSlice";
export default function ChangeMode({ className = "" }) {
  const dispatch = useDispatch();
  const Mode = () => {
    dispatch(changeMode());
    dispatch(closeMenu());
  };

  return (
    <>
      <Button
        className={`bg-gray-950 dark:bg-white dark:text-black hover:bg-gray-950 dark:hover:bg-white  hover:opacity-75 ${className}`}
        onClick={() => Mode()}
      >
        Switch Mode
      </Button>
    </>
  );
}
