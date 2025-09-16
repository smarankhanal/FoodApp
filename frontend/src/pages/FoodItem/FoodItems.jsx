import React, { useEffect, useState } from "react";
import { FoodCard, Search } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodItems } from "../../store/foodItemSlice";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function FoodItems() {
  const { items, loading } = useSelector((state) => state.foodItems);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(fetchFoodItems());
  }, [dispatch]);
  const filterFoodItems = items.filter((item) =>
    item.foodName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bgImage pt-20">
      <Search
        className="bg-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="sm:grid sm:grid-cols-3 grid gap-4 m-2">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
              >
                <SkeletonLoader height={150} className="mb-4" />
                <SkeletonLoader count={1} height={20} width="50%" />
                <SkeletonLoader count={1} height={20} width="50%" />
              </div>
            ))
          : filterFoodItems.map((item) => (
              <FoodCard key={item._id} item={item} />
            ))}
      </div>
    </div>
  );
}
