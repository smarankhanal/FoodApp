import React from "react";
import { Button, NoOrder, Status } from "../../components";

export default function UserHistory() {
  const orders = [
    {
      orderId: "A123",
      foodItems: [
        { foodName: "Margherita" },
        { foodName: "Pizza" },
        { foodName: "Margherita" },
        { foodName: "Pizza" },
        { foodName: "Margherita" },
        { foodName: "Pizza" },
      ],
      totalPrice: 12.99,
    },
    {
      orderId: "A123",
      foodItems: [{ foodName: "Margherita" }, { foodName: "Pizza" }],
      totalPrice: 12.99,
    },
  ];
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')]  bgImage pt-20 ">
      {orders.length === 0 ? (
        <NoOrder />
      ) : (
        <>
          <div className="w-full max-w-4xl mx-auto font-serif">
            <div className="w-full dark:text-white rounded-lg p-2 mt-6 flex  flex-row  align-center justify-center bg-amber-500 text-[18px] font-bold drop-shadow-[1px_1px_1px_red]">
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
            {orders.map((order) => (
              <div className="w-full dark:text-white rounded-lg p-2 mt-6 flex  flex-row  align-center justify-center dark:bg-black bg-white dark:drop-shadow-[1px_1px_1px_white]  drop-shadow-[2px_2px_1px_black]">
                <p className=" text-[18px] flex-1">{order.orderId}</p>
                <p className=" text-[18px] flex-1">
                  {order.foodItems
                    .map((fooditem) => fooditem.foodName)
                    .join(", ")}
                </p>
                <p className="text-green-600 font-bold text-[18px] flex-1  ">
                  {order.totalPrice}
                </p>
                <div className="flex-1">
                  <Status className="text-amber-500 drop-shadow-[2px_2px_orange]">
                    Pending
                  </Status>
                </div>
                <div className="flex-1 flex">
                  <p>2080/01/01</p>
                  <Button className="ml-6 h-10">View</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
