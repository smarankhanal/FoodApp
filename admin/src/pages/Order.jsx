import React, { useEffect } from "react";
import { Search, OrderItemSummary } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/orderSlice";

export default function Order() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  const { orders } = useSelector((state) => state.order);
  return (
    <div className=" dark:text-white  text-black  mt-10 ml-5 p-4 flex-1 w-full max-w-4xl max-h-fit font-serif ">
      <Search />
      <div className="flex">
        <p className="font-bold font-serif text-[20px] flex-1">
          Total Order :-
        </p>
        <div className="flex flex-col">
          <p className="font-bold font-serif text-[16px]">Pending :-</p>
          <p className="font-bold font-serif text-[16px]">Cancelled :-</p>
          <p className="font-bold font-serif text-[16px]">Completed :-</p>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 m-4 bg-amber-500 rounded-lg px-4 py-3 text-black font-bold items-center">
        <p>ORDER ID</p>
        <p>USER</p>
        <p>STATUS</p>
        <p>AMOUNT</p>
        <p>DATE</p>
        <div className="text-right">
          <select
            className="border rounded px-2 py-1 text-sm outline-none cursor-pointer dark:bg-black bg-white"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="date_asc">Date ↑</option>
            <option value="date_desc">Date ↓</option>
            <option value="amount_asc">Amount ↑</option>
            <option value="amount_desc">Amount ↓</option>
          </select>
        </div>
      </div>

      {orders.map((order) => (
        <OrderItemSummary order={order} key={order._id} />
      ))}
    </div>
  );
}
