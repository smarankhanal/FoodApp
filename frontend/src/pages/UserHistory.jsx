import React from "react";
import { Button, NoOrder } from "../componets";

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
          <div className="w-full max-w-3xl mx-auto font-serif">
            <div className="w-full dark:text-white rounded-lg p-2 mt-6 flex  flex-row  align-center justify-center bg-amber-500 text-[18px] font-bold drop-shadow-[1px_1px_1px_red]">
              <p className="mr-20 ">OrderId</p>
              <p className="w-6/12">FoodItems</p>
              <p className="text-green-800 w-4/12 ">TotalPrice</p>
            </div>
            {orders.map((order) => (
              <div className="w-full dark:text-white rounded-lg p-2 mt-6 flex  flex-row  align-center justify-center dark:bg-black bg-white dark:drop-shadow-[1px_1px_1px_white]  drop-shadow-[2px_2px_1px_black]">
                <p className="mr-20 text-[18px] ">{order.orderId}</p>
                <p className=" text-[18px] w-6/12 break-words">
                  {order.foodItems
                    .map((fooditem) => fooditem.foodName)
                    .join(",")}
                </p>
                <p className="text-green-600 font-bold text-[18px] ml-4 ">
                  {order.totalPrice}
                </p>
                <Button className="ml-6 h-10">View Order</Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
