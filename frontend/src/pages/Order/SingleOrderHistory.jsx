import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCapitalize } from "../../hooks/useCapitalize";

export default function SingleOrderHistory() {
  const statusColor = {
    pending: "text-yellow-600",
    completed: "text-green-600",
    cancelled: "text-red-600",
  };
  const { singleHistory } = useSelector((state) => state.history);

  const capitalize = useCapitalize();
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bgImage pt-20">
      <div className=" w-full max-w-3xl mx-auto dark:text-white mb-10 text-[20px] font-bold">
        <div className="flex bg-amber-500 rounded-lg mb-3 p-1">
          <p className="flex-1">Order Id</p> <p className="flex-1">Date</p>
          <p className="flex-1">Status</p> <p className="flex-1">Total Price</p>
        </div>
        <div className="flex dark:bg-white bg-black dark:text-black text-white rounded-lg mb-2 p-1">
          <p className="flex-1 mr-2 text-sm opacity-70">{singleHistory?._id}</p>

          <p className="flex-1 ">
            {new Date(singleHistory?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className={`flex-1 ${statusColor[singleHistory?.status]}`}>
            {capitalize(singleHistory?.status)}
          </p>
          <p className="flex-1 text-green-600">
            Rs {singleHistory?.totalPrice}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        {singleHistory.foodItems?.map((item) => (
          <div
            className=" relative flex flex-row m-2  dark:bg-black bg-white opacity-90 rounded-lg p-2 drop-shadow-[1px_1px_5px_black] dark:drop-shadow-[1px_1px_5px_white] "
            key={item._id}
          >
            <img
              src={item.foodItem.foodImage}
              alt={item.foodItem.foodName}
              className="h-30 w-50 rounded-lg animate-fadeIn"
            />
            <div className="ml-5 dark:text-white">
              <p className="text-xl font-bold text-amber-400">
                {capitalize(item.foodItem.foodName)}
              </p>
              <p className="font-semibold">
                Sub-category :-
                <span className="text-amber-600">
                  {capitalize(item.foodItem.subCategory)}
                </span>
              </p>
              <p className="font-semibold opacity-70">
                {" "}
                {item.foodItem.description}
              </p>

              <p className={`font-bold mt-1`}>
                Type :-
                <span
                  className={`${
                    item.foodItem.type?.toLowerCase() === "veg"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {capitalize(item.foodItem.type)}
                </span>
              </p>
              <p className="font-bold opacity-70 mt-1">
                Quantity :- {item.quantity}
              </p>
              <p className="font-bold text-lg mt-2 text-blue-500">
                {item.foodItem.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
