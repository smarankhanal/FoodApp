import React from "react";

export default function OrderedSingleFoodItem() {
  const type = "Veg";
  return (
    <>
      <div className=" relative flex flex-row m-2  dark:bg-black bg-white opacity-90 rounded-lg p-2 drop-shadow-[1px_1px_5px_black] dark:drop-shadow-[1px_1px_5px_white] ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FtLkRWNB8PmyvwOqk3FIfwv9VUE77E5sHw&s"
          alt="fooditem "
          className="h-30 w-50 rounded-lg animate-fadeIn"
        />
        <div className="ml-5 dark:text-white">
          <p className="text-xl font-bold text-amber-400">Food Item</p>
          <p className="font-semibold">Subcategory :- Strater</p>
          <p className={`font-bold`}>
            Type :-
            <span
              className={` ${
                type === "Veg" ? "text-green-500" : "text-red-500"
              }`}
            >
              {type}
            </span>
          </p>
          <p className="font-bold opacity-70">Quantity :-</p>
          <p className="font-bold text-lg mt-2 text-blue-500">$12.99</p>
        </div>
      </div>
    </>
  );
}
