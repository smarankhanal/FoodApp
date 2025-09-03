import React, { useEffect } from "react";
import OrderedSingleFoodItem from "../Order/OrderedSingleFoodItem";
import Select from "../Select";
import { useDispatch, useSelector } from "react-redux";
import { useCapitalize } from "../../hooks/useCapitalize";
import { updateOrderStatus } from "../../store/singleOrderSlice";
export default function OrderDetails() {
  const { order } = useSelector((state) => state.singleOrder);
  const dispatch = useDispatch();
  const capitalize = useCapitalize();
  const statusColors = {
    pending: "text-orange-500",
    cancelled: "text-red-500",
    completed: "text-green-500",
  };
  const handleOrderStatus = (e, userId, orderId) => {
    const newStatus = e.target.value.toLowerCase();
    dispatch(updateOrderStatus({ userId, orderId, status: newStatus }));
  };
  return (
    <div className=" relative m-10 w-full font-serif">
      <div className="flex">
        <div className="text-[20px] font-bold dark:text-white flex-1">
          <p>
            User Id :- <span className="opacity-60">{order.user}</span>
          </p>
          <p>
            Order Id :- <span className="opacity-60">{order._id}</span>
          </p>
          <p>
            Amount :-
            <span className=" text-blue-400">Rs {order.totalPrice}</span>
          </p>
          <p>
            Status :-
            <span
              className={`m-3 ${
                statusColors[order.status.toLowerCase() || ""]
              }`}
            >
              {capitalize(order.status)}
            </span>
          </p>
        </div>
        <div className="text-[20px] font-bold dark:text-white ">
          <div className="flex align-center justify-center">
            <div>
              Change Status :-
              <Select
                className="bg-gray-300 text-black"
                value={order.status || "pending"}
                onChange={(e) => handleOrderStatus(e, order.user, order._id)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {order.foodItems.map((foodItem) => (
          <OrderedSingleFoodItem foodItem={foodItem} key={foodItem._id} />
        ))}
      </div>
    </div>
  );
}
