import React from "react";
import { Search, SingleOrder } from "../components";

export default function Order() {
  return (
    <div className=" dark:text-white  text-black  mt-10 ml-5 p-4 flex-1 w-full max-w-4xl max-h-fit font-serif ">
      <Search />
      <div className="flex">
        <p className="font-bold font-serif text-[20px] flex-1">
          Total Order :-
        </p>
        <div className="flex flex-col">
          <p className="font-bold font-serif text-[16px]">Pending :-</p>
          <p className="font-bold font-serif text-[16px]">Cancelled :-</p>
          <p className="font-bold font-serif text-[16px]">Completed :-</p>
        </div>
      </div>
      <div className="flex m-4 bg-amber-500 rounded-lg p-2">
        <p className="flex-1/4 font-bold  ">ORDER ID</p>
        <p className="flex-1/4 font-bold">USER </p>
        <p className="flex-1/4 font-bold">STATUS </p>
        <p className="flex-1/4 font-bold mr-18">AMOUNT </p>
      </div>
      <SingleOrder />
    </div>
  );
}
