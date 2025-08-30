import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import Status from "../Status";

export default function OrderItemSummary({ order }) {
  return (
    <div className="grid grid-cols-6 items-center bg-black dark:bg-white rounded-lg m-4 p-3 dark:text-black text-white text-sm shadow-sm">
      <p className="truncate opacity-60">{order._id}</p>

      <p className=" font-medium truncate">{order.user}</p>

      <div>
        <Status className="text-amber-500 font-semibold">Pending</Status>
      </div>

      <p className="font-semibold">Rs {order.totalPrice}</p>

      <p>
        {new Date(order.createdAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <div className="flex gap-3 justify-center">
        <div
          className="bg-white dark:bg-black h-8 w-8 rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-105 transition"
          title="View Order"
        >
          <AiOutlineEye className="text-[18px] text-amber-500" />
        </div>
        <div
          className="bg-white dark:bg-black h-8 w-8 rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-105 transition"
          title="Edit Order Status"
        >
          <FaRegEdit className="text-[16px] text-blue-500" />
        </div>
      </div>
    </div>
  );
}
