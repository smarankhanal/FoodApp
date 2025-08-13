import React from "react";

export default function Button({ children, className = "", ...props }) {
  // Only base styles — no colors
  const baseStyles =
    "font-bold outline-none px-4 py-2 rounded-lg hover:opacity-70 hover:cursor-pointer active:opacity-70 transition duration-200";

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}
