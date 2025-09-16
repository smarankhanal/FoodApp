import React, { useEffect, useState } from "react";
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
    <>
      <div className=" relative flex flex-row m-2  dark:bg-black bg-white opacity-90 rounded-lg p-2 drop-shadow-[1px_1px_5px_black] dark:drop-shadow-[1px_1px_5px_white] ">
        <MdDeleteSweep
          className=" absolute top-2 right-2 h-7 w-7 text-red-500 hover:scale-[1.2] cursor-pointer"
          onClick={() => deleteItem(orderItem)}
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FtLkRWNB8PmyvwOqk3FIfwv9VUE77E5sHw&s"
          alt="fooditem "
          className="sm:h-30 sm:w-50 h-19 w-20 rounded-lg animate-fadeIn"
        />
        <div className="ml-5 dark:text-white">
          <p className="sm:text-xl font-bold text-amber-400">
            {capitalize(orderItem.foodName)}
          </p>
          <p className="font-semibold">
            Subcategory :-
            <span className="opacity-50">
              {capitalize(orderItem.subCategory)}
            </span>
          </p>
          <p className={`font-bold`}>
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
          <p className="font-bold opacity-70">
            Quantity :- {orderItem.quantity}
          </p>
          <p className="font-bold text-lg mt-2 text-blue-500">
            {orderItem.price}
          </p>
        </div>
      </div>
    </>
  );
}
