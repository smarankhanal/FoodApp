import React from "react";
import Nav from "./Nav";
import LogoInfo from "./LogoInfo";
import CopyRight from "./CopyRight";
import SocialMedia from "./SocialMedia";

export default function Footer() {
  return (
    <footer className="w-full max-w-5xl mx-auto bg-amber-400 rounded-lg p-4">
      <div className="flex flex-wrap justify-space  gap-4">
        <LogoInfo />
        <Nav />
      </div>

      <SocialMedia />
      <p className="font-bold dark:text-gray-700">
        SERVICE HOUR{" "}
        <span className="font-semibold text-sm">7:00AM to 9:00PM</span>
      </p>
      <hr className="border-0 h-0.5 bg-gray-700 my-4 mx-auto" />

      <CopyRight />
    </footer>
  );
}
