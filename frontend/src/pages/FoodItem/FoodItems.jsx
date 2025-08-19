import React, { useEffect } from "react";
import { FoodCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodItems } from "../../store/foodItemSlice";

export default function FoodItems() {
  const { items } = useSelector((state) => state.foodItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoodItems());
  }, []);
  return (
    <div className=" bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')]  bgImage pt-20">
      <div className="grid grid-cols-3 m-2">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
