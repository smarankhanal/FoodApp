import React from "react";
import AnchorTag from "../AnchorTag";

function Nav() {
  return (
    <div className="flex  flex-col   gap-8 ">
      <nav className="flex flex-col   text-sm">
        <h2 className="font-bold w-[100px]  text-black ml-1 text-sm">
          We're foodapp
        </h2>

        <AnchorTag className="dark:text-gray-600 text-black font-sm ml-1 ">
          About Us
        </AnchorTag>
        <AnchorTag
          href={"fooditems"}
          className="dark:text-gray-600 text-black font-sm ml-1"
        >
          Avaiable Food
        </AnchorTag>
        <AnchorTag
          href={"help&support"}
          className="dark:text-gray-600 text-black font-sm ml-1"
        >
          FAQ
        </AnchorTag>
      </nav>

      <nav>
        <h2 className="font-bold text-black ml-1 text-sm">Call us</h2>
        <p className="dark:text-gray-600 text-black font-sm">
          Our helpline stays the same across Kathmandu, Bhaktapur, Chitwan, and
          Butwal for seamless support.
        </p>
      </nav>
      <nav>
        <h2 className="font-bold text-black ml-1 text-sm">Contact us</h2>
        <p className="dark:text-gray-600 text-black font-sm ml-1 mb-3">
          9812345670,9876543210,056-123456
        </p>
      </nav>
    </div>
  );
}

export default Nav;
