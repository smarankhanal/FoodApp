import React from "react";
import SidebarItem from "./SidebarItem";
export default function Sidebar() {
  return (
    <div className=" pt-3 pl-1 max-h-screen">
      <SidebarItem text="Home" href="/home">
        <p>Home</p>
        <hr className="h-2  text-white dark:text-black" />
      </SidebarItem>
      <SidebarItem text="User" href="/user">
        <p>All User</p>
        <hr className="h-2  text-white dark:text-black" />
        <p>User History</p>
        <hr className="h-2  text-white dark:text-black" />

        <p>Delete User</p>
        <hr className="h-2  text-white dark:text-black" />
      </SidebarItem>
      <SidebarItem text="Order" href="/order">
        <p>Change Status</p>
        <hr className="h-2  text-white dark:text-black" />
        <p>View order</p>
        <hr className="h-2  text-white dark:text-black" />
      </SidebarItem>
      <SidebarItem text="FoodItems" href="/fooditem">
        <p>Add fooditem</p>

        <hr className="h-2  text-white dark:text-black" />
        <p>Delete fooditem</p>
        <hr className="h-2  text-white dark:text-black" />
        <p>Update fooditem</p>
        <hr className="h-2  text-white dark:text-black" />
      </SidebarItem>
    </div>
  );
}
