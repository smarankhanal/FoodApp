import React from "react";
import {
  SingleOrderItem,
  Button,
  StatusBadge,
  NoOrder,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../../store/orderSlice";
import { clearCart } from "../../store/cartSlice";
export default function OrderItems() {
  const dispatch = useDispatch();

  const {
    items: orderItems,
    totalPrice,
    totalQuantity,
  } = useSelector((state) => state.cart);

  const foodItems = orderItems.map((item) => ({
    foodItem: item._id,
    quantity: item.quantity || 1,
    price: item.price || 0,
  }));

  const onOrder = async () => {
    const orderData = {
      foodItems,
      totalPrice: Number(totalPrice) || 0,
      totalQuantity: Number(totalQuantity) || 0,
    };
    try {
      await dispatch(postOrder(orderData)).unwrap();
      dispatch(clearCart());
    } catch (err) {
      console.error("Error :", err);
    }
  };

  if (orderItems.length === 0) {
    return <NoOrder />;
  }
  return (
    <div className="relative bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bgImage pt-20 pb-10 px-4">
      <div className="flex justify-between">
        <StatusBadge status="Pending" />
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-[20px] dark:text-white mx-10 font-serif">
            Total Price :- {totalPrice}
          </div>
          <div className="mx-10 my-2 text-center">
            <Button onClick={() => onOrder()}>Order Now</Button>
          </div>
        </div>
      </div>

      <hr className="border-0 h-0.5 bg-gray-700 mx-4" />
      <div className="w-full max-w-3xl mx-auto">
        {orderItems.map((orderItem) => (
          <SingleOrderItem orderItem={orderItem} key={orderItem._id} />
        ))}
      </div>
    </div>
  );
}
