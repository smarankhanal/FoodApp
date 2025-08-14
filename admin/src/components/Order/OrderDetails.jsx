import React from "react";
import OrderedSingleFoodItem from "../Order/OrderedSingleFoodItem";
import Select from "../Select";
export default function OrderDetails() {
  const status = "Pending";
  const statusColors = {
    pending: "text-orange-500",
    cancelled: "text-red-500",
    delivered: "text-green-500",
  };
  return (
    <div className=" relative m-10 w-full font-serif">
      <div className="flex">
        <div className="text-[20px] font-bold dark:text-white flex-1">
          <p>User Id :-</p>
          <p>Order Id :-</p>
          <p>Amount :-</p>
          <p>
            Status :-
            <span className={`m-3 ${statusColors[status.toLowerCase() || ""]}`}>
              {status}
            </span>
          </p>
        </div>
        <div className="text-[20px] font-bold dark:text-white ">
          <div className="flex align-center justify-center">
            <p>
              Change Status :-
              <Select className="bg-gray-300 text-black">
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </Select>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <OrderedSingleFoodItem />
        <OrderedSingleFoodItem />
        <OrderedSingleFoodItem />
      </div>
    </div>
  );
}
