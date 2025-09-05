import React, { useEffect } from "react";
import { Search, OrderItemSummary } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/orderSlice";
import SkeletonLoader from "../components/SkeletonLoader";
export default function Order() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  const { loading, orders } = useSelector((state) => state.order);
  if (loading)
    return (
      <div className="dark:text-white text-black mt-10 ml-5 p-6 flex-1 w-full max-w-5xl font-serif">
        <div className="flex justify-between">
          <SkeletonLoader
            count={1}
            width={200}
            height={30}
            className="mb-4 opacity-50"
            baseColor="#000"
            highlightColor="#333"
          />
          <SkeletonLoader
            count={1}
            width={100}
            height={100}
            className="mb-4 opacity-50 rounded-lg"
            baseColor="#000"
            highlightColor="#333"
          />
        </div>
        <SkeletonLoader
          count={1}
          width="100%"
          height={40}
          className="mb-2 opacity-50"
          baseColor="#000"
          highlightColor="#333"
        />

        <SkeletonLoader
          count={5}
          width="100%"
          height={50}
          baseColor="#000"
          highlightColor="#333"
          className="opacity-50"
        />
      </div>
    );
  return (
    <div className=" dark:text-white  text-black  mt-10 ml-5 p-4 flex-1 w-full max-w-4xl max-h-fit font-serif ">
      <Search />
      <div className="flex">
        <p className="font-bold font-serif text-[20px] flex-1">
          Total Order :-{orders.length}
        </p>
        <div className="flex flex-col">
          <p className="font-bold font-serif text-[16px] text-orange-400">
            Pending :-{orders.filter((o) => o.status === "pending").length}
          </p>
          <p className="font-bold font-serif text-[16px] text-red-600">
            Cancelled :-{orders.filter((o) => o.status === "cancelled").length}
          </p>
          <p className="font-bold font-serif text-[16px] text-green-600">
            Completed :-{orders.filter((o) => o.status === "completed").length}
          </p>
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
