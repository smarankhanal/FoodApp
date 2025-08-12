import React from "react";

export default function Button({
  children,
  bgColor = "bg-white",
  textColor = "text-black",
  className = "",
  ...props
}) {
  return (
    <button
      className={`${className} ${bgColor} ${textColor} font-bold  outline-none px-4 py-2 dark:bg-black dark:text-white rounded-lg hover:opacity-70 hover:cursor-pointer  active:opacity-70 transition duration-200`}
      {...props}
    >
      {children}
    </button>
  );
}
