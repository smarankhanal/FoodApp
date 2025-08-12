import React from "react";

export default function Status({ className = "", children }) {
  return (
    <div className="flex-1/4">
      <div
        className={`h-fit w-fit px-2 font-bold rounded-lg bg-white dark:bg-black  ${className}`}
        title="Active"
      >
        {children}
      </div>
    </div>
  );
}
