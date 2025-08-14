import React from "react";

export default function Select({ className = "", children, label, ...props }) {
  return (
    <div>
      {label && (
        <label className="inline-block mt-2 mb-1 pl-1 font-bold text-black dark:text-white ">
          {label}
        </label>
      )}
      <select
        className={`px-3 py-3  w-full outline-none rounded-lg border border-blue-400 text-black shadow-sm hover:shadow-[2px_2px_1px_blue] transition-shadow duration-300  cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
