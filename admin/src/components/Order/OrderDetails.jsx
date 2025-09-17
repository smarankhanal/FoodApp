import React from "react";
import OrderedSingleFoodItem from "../Order/OrderedSingleFoodItem";
import { useSelector } from "react-redux";
import { useCapitalize } from "../../hooks/useCapitalize";

export default function OrderDetails() {
  const { order } = useSelector((state) => state.singleOrder);
  const capitalize = useCapitalize();

  const statusColors = {
    pending: "text-amber-500",
    cancelled: "text-red-500",
    completed: "text-green-500",
  };

  if (!order) return null;

  return (
    <div className="relative m-4 sm:m-10 w-full font-serif space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 sm:gap-6 bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-md">
        <div className="text-[16px]  font-bold dark:text-white space-y-1 sm:space-y-2">
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
            Status:
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

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
        {order.foodItems.map((foodItem) => (
          <OrderedSingleFoodItem foodItem={foodItem} key={foodItem._id} />
        ))}
      </div>
    </div>
  );
}
