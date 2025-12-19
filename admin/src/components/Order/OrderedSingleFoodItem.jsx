import React from "react";
import { useCapitalize } from "../../hooks/useCapitalize";

export default function OrderedSingleFoodItem({ foodItem }) {
  const singleFood = foodItem.foodItem;
  const capitalize = useCapitalize();
  return (
    <>
      <div className=" relative flex flex-col sm:flex-row m-2  dark:bg-black bg-white opacity-90 rounded-lg p-2 drop-shadow-[1px_1px_5px_black] dark:drop-shadow-[1px_1px_5px_white] text-center">
        <img
          src={singleFood.foodImage}
          alt={singleFood.foodName}
          className="w-auto sm:w-32 h-auto sm:h-28 rounded-lg animate-fadeIn "
        />
        <div className="ml-5 dark:text-white text-[14px]">
          <p className="text-xl font-bold text-amber-400">
            {capitalize(singleFood.foodName)}
          </p>
          <p className="font-semibold">
            Subcategory :- {capitalize(singleFood.subCategory)}
          </p>
          <p className={`font-bold`}>
            Type :-
            <span
              className={` ${
                singleFood?.type?.toLowerCase() === "veg"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {capitalize(singleFood.type)}
            </span>
          </p>
          <p className="font-bold opacity-70">
            Quantity :- {foodItem.quantity}
          </p>
          <p className="font-bold text-lg mt-2 text-blue-500">
            Rs {singleFood.price}
          </p>
        </div>
      </div>
    </>
  );
}
