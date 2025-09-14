import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateOrderStatus } from "../../store/singleOrderSlice";
import Status from "../Status";
import { useCapitalize } from "../../hooks/useCapitalize";
import { fetchSingleOrder } from "../../store/singleOrderSlice";

export default function ChangeOrderStatus() {
  const { userId, orderId } = useParams();
  const dispatch = useDispatch();
  const { order: singleOrder } = useSelector((state) => state.singleOrder);
  const capitalize = useCapitalize();

  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (singleOrder?.status) {
      setStatus(singleOrder.status);
    }
  }, [singleOrder]);

  const statusStyles = {
    pending: "text-amber-500",
    completed: "text-green-500",
    cancelled: "text-red-500",
  };

  const handleOrderStatus = async (e) => {
    const newStatus = e.target.value.toLowerCase();
    setStatus(newStatus);
    await dispatch(
      updateOrderStatus({ userId, orderId, status: newStatus })
    ).unwrap();
  };

  return (
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg w-full max-w-md mx-auto mt-12 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Change Order Status
      </h2>

      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Current Status:
        </span>
        <Status
          className={`${
            statusStyles[status.toLowerCase()]
          } font-semibold text-lg transition-colors duration-300`}
        >
          {capitalize(status)}
        </Status>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="status-select"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Update Status:
        </label>
        <select
          id="status-select"
          value={status}
          onChange={handleOrderStatus}
          className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
}
