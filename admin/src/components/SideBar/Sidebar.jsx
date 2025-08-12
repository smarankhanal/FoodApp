import React from "react";
import Single from "./Single";

Single;
export default function Sidebar() {
  return (
    <div className="pt-3 pl-3 min-h-screen">
      <Single text="Home" href="/home">
        <a href="/">Home</a>
        <hr className="h-2  text-white dark:text-black" />
      </Single>
      <Single text="User" href="/user">
        <a href="/">All User</a>
        <hr className="h-2  text-white dark:text-black" />
        <a href="/">User History</a>
        <hr className="h-2  text-white dark:text-black" />

        <a href="/">Delete User</a>
        <hr className="h-2  text-white dark:text-black" />
      </Single>
      <Single text="Order" href="/order">
        <a href="/">Change Status</a>
        <hr className="h-2  text-white dark:text-black" />
        <a href="/">View order</a>
        <hr className="h-2  text-white dark:text-black" />
      </Single>
      <Single text="FoodItems" href="/fooditems">
        <a href="/">
          <p>Add fooditem</p>
        </a>
        <hr className="h-2  text-white dark:text-black" />
        <a href="/">Delete fooditem</a>
        <hr className="h-2  text-white dark:text-black" />
        <a href="/">Update fooditem</a>
        <hr className="h-2  text-white dark:text-black" />
      </Single>
    </div>
  );
}
