import React, { useEffect } from "react";
import OrderedSingleFoodItem from "../Order/OrderedSingleFoodItem";
import Select from "../Select";
import { useSelector } from "react-redux";
export default function OrderDetails() {
  const { order } = useSelector((state) => state.order);
  const statusColors = {
    pending: "text-orange-500",
    cancelled: "text-red-500",
    delivered: "text-green-500",
  };
  useEffect(() => {
    console.log(order);
  }, []);
  return (
    <div className=" relative m-10 w-full font-serif">
      <div className="flex">
        <div className="text-[20px] font-bold dark:text-white flex-1">
          <p>
            User Id :- <span className="opacity-60">{order?.user}</span>
          </p>
          <p>
            Order Id :- <span className="opacity-60">as</span>
          </p>
          <p>
            Amount :- <span className="opacity-60">as</span>
          </p>
          <p>
            Status :-
            <span className={`m-3 ${statusColors[status.toLowerCase() || ""]}`}>
              {status}
            </span>
          </p>
        </div>
        <div className="text-[20px] font-bold dark:text-white ">
          <div className="flex align-center justify-center">
            <div>
              Change Status :-
              <Select className="bg-gray-300 text-black">
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </Select>
            </div>
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
