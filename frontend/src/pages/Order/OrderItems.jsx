import React, { useState } from "react";
import {
  SingleOrderItem,
  Button,
  StatusBadge,
  NoOrder,
  Toast,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../../store/orderSlice";
import { clearCart } from "../../store/cartSlice";

export default function OrderItems() {
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ show: false, text: "", className: "" });
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
      setToast({
        show: true,
        text: "Order placed successfully",
        className: "text-green-500",
      });
      dispatch(clearCart());
      setTimeout(
        () => setToast({ show: false, text: "", className: "" }),
        2000
      );
    } catch {
      setToast({
        show: true,
        text: "Failed to place order",
        className: "text-red-500",
      });
    }
  };

  return (
    <>
      {toast.show && (
        <Toast
          show={toast.show}
          text={toast.text}
          className={toast.className}
        />
      )}
      {orderItems.length === 0 ? (
        <NoOrder />
      ) : (
        <div className="relative bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bg-cover bg-center pt-20 pb-10 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
            <StatusBadge status="Pending" />
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold dark:text-white font-serif mb-2">
                Total Price: {totalPrice}
              </div>
              <Button
                onClick={onOrder}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition duration-300"
              >
                Order Now
              </Button>
            </div>
          </div>

          <hr className="border-0 h-1 bg-gray-700 mx-4 mb-6 rounded" />

          <div className="w-full max-w-3xl mx-auto grid gap-4 font-serif">
            {orderItems.map((orderItem) => (
              <SingleOrderItem orderItem={orderItem} key={orderItem._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
