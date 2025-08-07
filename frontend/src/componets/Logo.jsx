import React from "react";

function Logo({ className, ...props }) {
  return (
    <div className="m-1">
      <img
        src="/images/foodapp-logo.png"
        alt="logo"
        className={` h-15 w-15 ${className}`}
        {...props}
      />
    </div>
  );
}

export default Logo;
