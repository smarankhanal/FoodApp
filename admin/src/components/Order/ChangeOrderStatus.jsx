import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  updateOrderStatus,
  fetchSingleOrder,
} from "../../store/singleOrderSlice";
import Status from "../Status";
import { useCapitalize } from "../../hooks/useCapitalize";

export default function ChangeOrderStatus() {
  const { userId, orderId } = useParams();
  const navigate = useNavigate();
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
    pending: "text-amber-500 bg-amber-100 dark:bg-amber-900/30",
    completed: "text-green-500 bg-green-100 dark:bg-green-900/30",
    cancelled: "text-red-500 bg-red-100 dark:bg-red-900/30",
  };

  const handleOrderStatus = async (e) => {
    const newStatus = e.target.value.toLowerCase();
    setStatus(newStatus);
    await dispatch(
      updateOrderStatus({ userId, orderId, status: newStatus })
    ).unwrap();
    navigate("/order");
  };

  return (
    <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-2xl w-full max-w-md sm:mx-auto mt-12  ml-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center font-serif">
        Change Order Status
      </h2>

      <div className="flex flex-col sm:flex-row items-center sm:justify-between bg-gray-100 p-4 sm:p-5 rounded-xl shadow-md mb-6 gap-3 sm:gap-4">
        <span className="text-sm sm:text-base font-medium text-gray-700 ">
          Current Status:
        </span>
        <Status
          className={`${
            statusStyles[status.toLowerCase()]
          } font-semibold px-4 py-2 rounded-full text-sm sm:text-base `}
        >
          {capitalize(status)}
        </Status>
      </div>

      <div className="flex flex-col gap-3">
        {status === "pending" ? (
          <>
            <label
              htmlFor="status-select"
              className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300"
            >
              Update Status:
            </label>

            <select
              id="status-select"
              value={status}
              onChange={(e) => handleOrderStatus(e)}
              className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer shadow-sm transition duration-300"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
