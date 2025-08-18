import React from "react";
import { Link } from "react-router-dom";
export default function AnchorTag({
  href = "/",
  children,
  className = "",
  ...props
}) {
  return (
    <Link
      to={href}
      className={` hover:underline   hover:decoration-2 hover:underline-offset-4  focus:opacity-70 transition-opacity duration-150  ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
