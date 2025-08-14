import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`font-bold outline-none px-4 py-2 rounded-lg hover:opacity-70 hover:cursor-pointer active:opacity-70 transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
