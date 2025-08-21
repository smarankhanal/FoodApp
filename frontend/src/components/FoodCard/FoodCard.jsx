import React, { useEffect, useState } from "react";
import Button from "../Button";
import Quantity from "./Quantity";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";

export default function FoodCard({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, text: "", className: "" });
  const itemInCart = useSelector((state) =>
    state.cart.items.find((cartItem) => cartItem._id === item._id)
  );
  const quantity = itemInCart?.quantity || 0;
  const singleFoodItem = () => {
    navigate(`/foodItem/${item._id}`);
  };
  const itemAddedToCart = (item) => {
    dispatch(addToCart(item));
    setToast({
      show: true,
      text: `${item.foodName} add to cart`,
      className: "text-green-500",
    });
    setTimeout(() => setToast({ show: false, text: "" }), 3000);
  };
  const itemRemoveFromCart = (itemId) => {
    dispatch(removeCart(itemId));
    setToast({
      show: true,
      text: `${item.foodName} removed from cart`,
      className: "text-red-500",
    });
    setTimeout(() => setToast({ show: false, text: "" }), 3000);
  };
  return (
    <>
      <div
        className="w-[300px] mt-4 ml-4 rounded-lg  bg-[#f6f6f6] dark:bg-[#000000]  dark:drop-shadow-[2px_2px_5px_white] drop-shadow-[2px_2px_5px_black] 
      "
      >
        <div className="w-full overflow-hidden rounded-t-lg">
          <img
            src={item.foodImage}
            alt="Food Item"
            className="relative w-full h-48 object-cover rounded-t-lg"
          />
          <span
            className="absolute top-2 right-2 bg-black  dark:bg-white bg-opacity-50 text-white rounded-full p-1 cursor-pointer select-none hover:scale-[1.3] transition-transform duration-300"
            title="See Full Description"
            onClick={() => singleFoodItem()}
          >
            ℹ️
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg dark:text-white text-black mb-1">
            {item.foodName}
          </h3>
          <p className="text-sm dark:text-gray-300 text-gray-700 mb-2">
            {item.description}
          </p>
          <p className="font-semibold dark:text-white text-black mb-4">
            Price :- {item.price}
          </p>
          <Quantity item={item} />
          {quantity ? (
            <div className="flex flex-col justify-center items-center">
              <Button
                className="px-6 py-2 hover:bg-red-400 bg-red-600"
                onClick={() => itemRemoveFromCart(item._id)}
              >
                Remove from cart
              </Button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Button
                className="px-6 py-2 hover:bg-green-500"
                onClick={() => itemAddedToCart(item)}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
      {toast.show ? (
        <Toast
          show={toast.show}
          text={toast.text}
          className={toast.className}
        />
      ) : (
        ""
      )}
    </>
  );
}
