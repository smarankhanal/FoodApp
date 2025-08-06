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
      className={`font-bold text-black outline-none px-4 py-2 rounded-lg hover:bg-blue-400 hover:cursor-pointer ${bgColor} ${textColor} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}
