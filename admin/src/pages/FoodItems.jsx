import { Search, FoodItemSummary } from "../components";
import { MdOutlineAdd } from "react-icons/md";

import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodItem } from "../store/foodItemSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../components/SkeletonLoader";
export default function FoodItems() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFoodItem());
  }, []);
  const { loading, foodItems } = useSelector((state) => state.foodItem);
  const navigate = useNavigate();
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
            width={200}
            height={30}
            className="mb-4 opacity-50"
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
      <div className="flex justify-between items-center">
        <p className="font-bold font-serif text-[20px]">
          Total FoodItems :- {foodItems.length}
        </p>

        <Button
          className=" dark:bg-blue-700  bg-blue-600 text-white  w-[100px] flex items-center justify-center gap-1"
          onClick={() => navigate("/add-food-item")}
        >
          Add
          <MdOutlineAdd />
        </Button>
      </div>

      <div className="flex m-4 bg-amber-500 rounded-lg p-2">
        <p className="flex-1 font-bold">IMAGE</p>
        <p className="flex-1 font-bold">NAME</p>
        <p className="flex-1 font-bold">CATEGORY/TYPE </p>
        <p className="flex-1 font-bold">AMOUNT</p>
        <div className=" flex-1">
          <select
            className="border rounded p-1 outline-none  cursor-pointer dark:bg-black bg-white"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="pending">Veg</option>
            <option value="completed">Non-Veg</option>
            <option value="price_asc">Amount ↑</option>
            <option value="price_desc">Amount ↓</option>
          </select>
        </div>
      </div>
      {foodItems.map((item) => (
        <FoodItemSummary item={item} key={item._id} />
      ))}
    </div>
  );
}
