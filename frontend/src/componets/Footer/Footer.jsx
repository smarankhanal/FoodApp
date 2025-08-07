import React from "react";
import Nav from "./Nav";
import LogoInfo from "./LogoInfo";
import CopyRight from "./CopyRight";
import SocialMedia from "./SocialMedia";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl bg-amber-400 rounded-t-lg p-4 z-50">
      <div className="flex flex-wrap justify-space  gap-4">
        <LogoInfo />
        <Nav />
      </div>
      <SocialMedia />
      <hr className="border-0 h-0.5 bg-gray-700 my-4 mx-auto" />

      <CopyRight />
    </footer>
  );
}
