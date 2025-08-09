import React from "react";

export default function Button({
  children,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`${className} ${bgColor} ${textColor} font-bold  outline-none px-4 py-2 rounded-lg hover:bg-blue-400 hover:cursor-pointer  active:opacity-70 transition duration-200`}
      {...props}
    >
      {children}
    </button>
  );
}
