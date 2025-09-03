import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import Status from "../Status";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSingleOrder } from "../../store/singleOrderSlice";
import { useCapitalize } from "../../hooks/useCapitalize";

export default function OrderItemSummary({ order }) {
  const statusStyles = {
    pending: "text-amber-500  ",
    completed: "text-green-500 ",
    cancelled: "text-red-500 ",
  };

  const capitalize = useCapitalize();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewOrder = async (userId, orderId) => {
    await dispatch(fetchSingleOrder({ userId, orderId })).unwrap();
    navigate(`/order-details/user=${userId}/order=${orderId}`);
  };

  return (
    <div className="grid grid-cols-6 items-center bg-black dark:bg-white rounded-lg m-4 p-3 dark:text-black text-white text-sm shadow-sm">
      <p className="truncate opacity-60">{order._id}</p>

      <p className=" font-medium truncate">{order.user}</p>

      <div>
        <Status
          className={`${statusStyles[order.status.toLowerCase()]}font-semibold`}
        >
          {capitalize(order.status)}
        </Status>
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
          onClick={() => viewOrder(order.user, order._id)}
        >
          <AiOutlineEye className="text-[18px] text-amber-500" />
        </div>
        <div
          className="bg-white dark:bg-black h-8 w-8 rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-105 transition"
          title="Edit Order Status"
          onClick={() => viewOrder(order.user, order._id)}
        >
          <FaRegEdit className="text-[16px] text-blue-500" />
        </div>
      </div>
    </div>
  );
}
