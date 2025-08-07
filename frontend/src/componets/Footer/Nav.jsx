import React from "react";
import AnchorTag from "../AnchorTag";

function Nav() {
  return (
    <div className="flex flex-1/4 gap-8 ">
      <nav className="flex flex-col">
        <h2 className="font-bold text-black ml-1">Company</h2>

        <AnchorTag className="dark:text-gray-600 text-black font-semibold ml-1">
          Hello
        </AnchorTag>
      </nav>
      <nav className="flex flex-col">
        <h2 className="font-bold text-black ml-1">Support</h2>

        <AnchorTag className="dark:text-gray-600 text-black font-semibold ml-1">
          Hello
        </AnchorTag>
      </nav>
    </div>
  );
}

export default Nav;
