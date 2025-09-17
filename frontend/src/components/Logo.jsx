import React from "react";

function Logo({ className, ...props }) {
  return (
    <div>
      <img
        src="/images/foodapp-logo.png"
        alt="logo"
        className={` ${className} h-15 w-15`}
        {...props}
      />
    </div>
  );
}

export default Logo;
