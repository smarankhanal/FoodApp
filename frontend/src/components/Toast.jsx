import React from "react";

export default function Toast({ text, show, className = "" }) {
  return (
    <div
      className={`fixed bottom-4 right-4 w-[250px] px-4 py-2 rounded-lg shadow-lg font-bold 
       dark:bg-white bg-black transition-all duration-500
      ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {text}
    </div>
  );
}
