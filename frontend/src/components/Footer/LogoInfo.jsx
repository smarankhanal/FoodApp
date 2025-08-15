import React from "react";
import Logo from "../Logo";

export default function LogoInfo() {
  return (
    <aside className="flex-1">
      <Logo />
      <p className="text-black dark:text-gray-600 text-sm">
        Food Private Ltd.
        <br />
        Providing reliable service since 2022
      </p>
    </aside>
  );
}
