import React from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useCapitalize } from "../../hooks/useCapitalize";
import { useDispatch } from "react-redux";
import { removeCart } from "../../store/cartSlice";

export default function SingleOrderItem({ orderItem }) {
  const capitalize = useCapitalize();
  const dispatch = useDispatch();

  const deleteItem = (orderItem) => {
    dispatch(removeCart(orderItem._id));
  };

  return (
    <div className="relative flex flex-row items-center m-3 p-4 rounded-xl bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-700 hover:shadow-lg hover:scale-[1.01] transition duration-200">
      <MdDeleteSweep
        className="absolute top-3 right-3 h-7 w-7 text-red-500 hover:text-red-600 hover:scale-110 transition cursor-pointer"
        onClick={() => deleteItem(orderItem)}
      />

      <img
        src={orderItem.foodImage}
        alt={orderItem.foodName}
        className="h-24 w-28 sm:h-28 sm:w-36 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
      />

      <div className="ml-5 dark:text-white flex flex-col justify-between">
        <p className="text-lg sm:text-xl font-bold text-amber-500 tracking-wide">
          {capitalize(orderItem.foodName)}
        </p>

        <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mt-1">
          Subcategory:
          <span className="ml-1 opacity-70">
            {capitalize(orderItem.subCategory)}
          </span>
        </p>

        <p className="text-sm sm:text-base font-medium mt-1">
          Type:
          <span
            className={`ml-1 font-semibold ${
              orderItem.type.toLowerCase() === "veg"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {capitalize(orderItem.type)}
          </span>
        </p>

        <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mt-1">
          Quantity:
          <span className="ml-1 opacity-80">{orderItem.quantity}</span>
        </p>

        <p className="text-lg sm:text-xl font-bold mt-2 text-blue-600 dark:text-blue-400">
          Rs {orderItem.price}
        </p>
      </div>
    </div>
  );
}
