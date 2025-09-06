import React from "react";
import OrderedSingleFoodItem from "../Order/OrderedSingleFoodItem";
import { useSelector } from "react-redux";
import { useCapitalize } from "../../hooks/useCapitalize";

export default function OrderDetails() {
  const { order } = useSelector((state) => state.singleOrder);

  const capitalize = useCapitalize();

  const statusColors = {
    pending: "text-orange-500",
    cancelled: "text-red-500",
    completed: "text-green-500",
  };

  return (
    <div className="relative m-10 w-full font-serif space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <div className="text-[20px] font-bold dark:text-white space-y-2">
          <p>
            User Id: <span className="opacity-60">{order.user}</span>
          </p>
          <p>
            Order Id: <span className="opacity-60">{order?._id}</span>
          </p>
          <p>
            Amount: <span className="text-blue-400">Rs {order.totalPrice}</span>
          </p>
          <p>
            Status:{" "}
            <span
              className={`m-1 font-semibold ${
                statusColors[order.status.toLowerCase()]
              }`}
            >
              {capitalize(order.status)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {order.foodItems.map((foodItem) => (
          <OrderedSingleFoodItem foodItem={foodItem} key={foodItem._id} />
        ))}
      </div>
    </div>
  );
}
