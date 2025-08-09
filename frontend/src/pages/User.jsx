import React from "react";
import { UserProfile } from "../componets";

export default function User() {
  return (
    <div className="pt-20 bgImage bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')]">
      <UserProfile />
    </div>
  );
}
