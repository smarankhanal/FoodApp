import React, { useId } from "react";

export default function Input({
  label,
  type = "text",
  className = "",
  ...props
}) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mt-2 mb-1 pl-1 font-bold text-black dark:text-white ">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-3  w-full outline-none rounded-lg border border-blue-400 text-black dark:text-white shadow-sm hover:shadow-[2px_2px_1px_blue] transition-shadow duration-300 ${className} `}
        {...props}
        id={id}
      />
    </div>
  );
}
