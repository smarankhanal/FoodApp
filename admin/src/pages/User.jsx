import React from "react";
import { Search, SingleUser } from "../components";

export default function User() {
  return (
    <div className=" dark:text-white  text-black  mt-10 ml-5 p-4 flex-1 w-full max-w-4xl max-h-fit font-serif ">
      <Search />
      <div className="flex">
        <p className="font-bold font-serif text-[20px] flex-1">Total User :-</p>
        <p className="font-bold font-serif text-[20px]">Active User :-</p>
      </div>
      <div className="flex m-4 bg-amber-500 rounded-lg p-2">
        <p className="flex-1/4 font-bold">USER ID</p>
        <p className="flex-1/4 font-bold">NAME </p>
        <p className="flex-1/4 font-bold mr-14">STATUS </p>
      </div>
      <SingleUser />
    </div>
  );
}
