import React from "react";
import SidebarItem from "./SidebarItem";
export default function Sidebar() {
  return (
    <div className="pt-3 pl-3">
      <SidebarItem text="Home" href="/home">
        <a href="/">Home</a>
        <hr className="h-2  text-white dark:text-black" />
      </SidebarItem>
      <SidebarItem text="User" href="/user">
        <a href="/">All User</a>
        <hr className="h-2  text-white dark:text-black" />
        <a href="/">User History</a>
        <hr className="h-2  text-white dark:text-black" />

        <a href="/">Delete User</a>
        <hr className="h-2  text-white dark:text-black" />
      </SidebarItem>
      <SidebarItem text="Order" href="/order">
        <a href="/">Change Status</a>
        <hr className="h-2  text-white dark:text-black" />
        <a href="/">View order</a>
        <hr className="h-2  text-white dark:text-black" />
      </SidebarItem>
      <SidebarItem text="FoodItems" href="/fooditem">
        <a href="/">
          <p>Add fooditem</p>
        </a>
        <hr className="h-2  text-white dark:text-black" />
        <a href="/">Delete fooditem</a>
        <hr className="h-2  text-white dark:text-black" />
        <a href="/">Update fooditem</a>
        <hr className="h-2  text-white dark:text-black" />
      </SidebarItem>
    </div>
  );
}
