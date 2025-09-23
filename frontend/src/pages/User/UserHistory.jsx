import React, { useEffect, useState } from "react";
import { Button, NoOrder, Search, Status } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchHistory, fetchSingleHistory } from "../../store/historySlice";
import { useCapitalize } from "../../hooks/useCapitalize";

export default function UserHistory() {
  const statusClasses = {
    pending: "text-amber-600 drop-shadow-[2px_2px_orange]",
    cancelled: "text-red-500 drop-shadow-[2px_2px_red]",
    completed: "text-green-500 drop-shadow-[2px_2px_green]",
  };
  const { history: orders } = useSelector((state) => state.history);
  const capitalize = useCapitalize();
  const [sortedOrders, setSortedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onView = (orderId) => {
    dispatch(fetchSingleHistory(orderId));
    navigate(`/single-order/${orderId}`);
  };
  useEffect(() => {
    setSortedOrders(orders);
  }, [orders]);
  useEffect(() => {
    dispatch(fetchHistory());
  }, []);
  const handleSortChange = (value) => {
    let sorted = [...orders];
    if (value === "pending" || value === "completed" || value === "cancelled") {
      sorted = sorted.filter((order) => order.status.toLowerCase() === value);
    } else if (value === "price_asc") {
      sorted.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (value === "price_desc") {
      sorted.sort((a, b) => b.totalPrice - a.totalPrice);
    } else if (value === "date_asc") {
      sorted.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    } else if (value === "date_desc") {
      sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    setSortedOrders(sorted);
  };
  const filteredOrders = sortedOrders.filter(
    (order) =>
      order._id.includes(searchQuery) ||
      order.foodItems.some((item) =>
        item.foodItem.foodName.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
  return (
    <>
      <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')]  bgImage pt-20 ">
        {orders.length === 0 ? (
          <NoOrder />
        ) : (
          <>
            <Search
              className="bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="hidden sm:block w-full max-w-4xl mx-auto font-serif">
              <div className="w-full dark:text-white rounded-lg p-2 mt-6 flex  flex-row  align-center justify-center bg-amber-500  font-bold drop-shadow-[1px_1px_1px_red] text-[18px]">
                <p className="flex-1 ">OrderId</p>
                <p className="flex-1">FoodItems</p>
                <p className="text-green-800 flex-1 ">TotalPrice</p>
                <p className="flex-1">Status</p>
                <div className="flex flex-1">
                  <p>Date</p>
                  <div className="flex-1 ml-10">
                    <select
                      className="border rounded p-1 outline-none  cursor-pointer dark:bg-black bg-white text-sm"
                      onChange={(e) => handleSortChange(e.target.value)}
                    >
                      <option value="">Sort/Filter</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="price_asc">Date ↑</option>
                      <option value="price_desc">Date ↓</option>
                      <option value="price_asc">Price ↑</option>
                      <option value="price_desc">Price ↓</option>
                    </select>
                  </div>
                </div>
              </div>
              {filteredOrders.map((order) => (
                <div
                  className="w-full dark:text-white rounded-lg p-2 mt-6 flex  flex-row  align-center justify-center dark:bg-black bg-white dark:drop-shadow-[1px_1px_1px_white]  drop-shadow-[2px_2px_1px_black]"
                  key={order._id}
                >
                  <p className=" text-[14px] flex-1 mr-2 text-amber-400">
                    {order._id}
                  </p>
                  <p className=" text-[14px] flex-1 mr-2">
                    {order.foodItems
                      .map((item) => item.foodItem?.foodName)
                      .filter((name) => name)
                      .map((name) => capitalize(name))
                      .join(", ")}
                  </p>
                  <p className="text-green-600 font-bold text-[18px] flex-1  ">
                    {order.totalPrice}
                  </p>
                  <div className="flex-1">
                    <Status
                      className={
                        statusClasses[order.status.toLowerCase()] ||
                        statusClasses.completed
                      }
                    >
                      {capitalize(order.status)}
                    </Status>
                  </div>
                  <div className="flex-1 flex">
                    <p>
                      {new Date(order.updatedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <Button
                      className="ml-6 h-10"
                      onClick={() => onView(order._id)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* //mobile */}
        <div className="block sm:hidden w-full max-w-4xl mx-auto font-serif">
          <div className="w-full dark:text-white rounded-lg p-2 mt-6 flex  flex-row  align-center justify-center bg-amber-500  font-bold drop-shadow-[1px_1px_1px_red] text-[15px]">
            <p className="flex-1 ">OrderId</p>
            <p className="flex-1">Status</p>

            <div className="flex-1">
              <select
                className="border rounded p-1 outline-none  cursor-pointer dark:bg-black bg-white text-sm"
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Sort/Filter</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          {filteredOrders.map((order) => (
            <div
              className="w-full dark:text-white rounded-lg p-2 mt-6 flex  flex-row  align-center justify-center dark:bg-black bg-white dark:drop-shadow-[1px_1px_1px_white]  drop-shadow-[2px_2px_1px_black]"
              key={order._id}
            >
              <p className=" text-[14px] flex-1 mr-2 text-amber-400 truncate">
                {order._id}
              </p>

              <div className="flex-1">
                <Status
                  className={`text-[12px] ${
                    statusClasses[order.status.toLowerCase()] ||
                    statusClasses.completed
                  }`}
                >
                  {capitalize(order.status)}
                </Status>
              </div>
              <div className="flex-1">
                <Button className="ml-6 h-10" onClick={() => onView(order._id)}>
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
