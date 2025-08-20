import React from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useCapitalize } from "../../hooks/useCapitalize";
export default function SingleOrderItem({ orderItem }) {
  const capitalize = useCapitalize();

  return (
    <div className=" relative flex flex-row m-2  dark:bg-black bg-white opacity-90 rounded-lg p-2 drop-shadow-[1px_1px_5px_black] dark:drop-shadow-[1px_1px_5px_white] ">
      <MdDeleteSweep className=" absolute top-2 right-2 h-7 w-7 text-red-500 hover:scale-[1.2] cursor-pointer" />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FtLkRWNB8PmyvwOqk3FIfwv9VUE77E5sHw&s"
        alt="fooditem "
        className="h-30 w-50 rounded-lg animate-fadeIn"
      />
      <div className="ml-5 dark:text-white">
        <p className="text-xl font-bold text-amber-400">
          {capitalize(orderItem.foodName)}
        </p>
        <p className="font-semibold">
          Subcategory :- {capitalize(orderItem.subCategory)}
        </p>
        <p className={`font-bold `}>
          Type :-
          <span
            className={`${
              orderItem.type.toLowerCase() === "veg"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {capitalize(orderItem.type)}
          </span>
        </p>
        <p className="font-bold opacity-70">Quantity :- {orderItem.quantity}</p>
        <p className="font-bold text-lg mt-2 text-blue-500">
          {orderItem.price}
        </p>
      </div>
    </div>
  );
}
