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
        <label className="inline-block mb-1 pl-1 font-bold text-blue-700 ">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-3  w-full outline-none rounded-lg border border-blue-400 text-black dark:text-white shadow-sm hover:shadow-lg transition-shadow duration-300 ${className} `}
        {...props}
        id={id}
        autoComplete="off"
      />
    </div>
  );
}
