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
        <p className="flex-1 font-bold">USER ID</p>
        <p className="flex-1 font-bold">NAME </p>
        <p className="flex-1 font-bold">STATUS </p>
        <p className="flex-1 font-bold">DATE </p>
        <div className=" flex-1">
          <select
            className="border rounded p-1 outline-none  cursor-pointer"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="name_as" className="dark:bg-black bg-white">
              Active
            </option>
            <option value="name_desc" className="dark:bg-black bg-white">
              No Active
            </option>
            <option value="price_asc" className="dark:bg-black bg-white">
              Date ↑
            </option>
            <option value="price_desc" className="dark:bg-black bg-white">
              Date ↓
            </option>
          </select>
        </div>
      </div>

      <SingleUser />
    </div>
  );
}
