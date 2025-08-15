import React, { Children } from "react";

export default function AnchorTag({
  href = "/",
  children,
  className = "",
  ...props
}) {
  return (
    <a
      href={href}
      className={`  hover:underline   hover:decoration-2 hover:underline-offset-4  active:opacity-70 transition-opacity duration-150  ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
