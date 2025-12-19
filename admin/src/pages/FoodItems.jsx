import { Search, FoodItemSummary } from "../components";
import { MdOutlineAdd } from "react-icons/md";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodItem } from "../store/foodItemSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../components/SkeletonLoader";

export default function FoodItems() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sortedFoodItems, setSortedFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, foodItems } = useSelector((state) => state.foodItem);

  useEffect(() => {
    dispatch(fetchFoodItem());
  }, [dispatch]);

  useEffect(() => {
    setSortedFoodItems(foodItems);
  }, [foodItems]);

  const handleSortChange = (value) => {
    let sorted = [...foodItems];

    if (value === "veg")
      sorted = sorted.filter((f) => f.type.toLowerCase() === "veg");
    else if (value === "non-veg")
      sorted = sorted.filter((f) => f.type.toLowerCase() === "non-veg");
    else if (value === "price_asc") sorted.sort((a, b) => a.price - b.price);
    else if (value === "price_desc") sorted.sort((a, b) => b.price - a.price);

    setSortedFoodItems(sorted);
  };

  const filteredItems = sortedFoodItems.filter(
    (item) =>
      item.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="mt-10 p-4 w-full max-w-5xl">
        <SkeletonLoader height={35} className="mb-4" />
        <SkeletonLoader height={35} className="mb-4" />
        <SkeletonLoader count={5} height={60} />
      </div>
    );
  }

  return (
    <div className="dark:text-white text-black mt-6 sm:mt-10 sm:ml-5 p-4 flex-1 w-full max-w-5xl font-serif">
      {/* Search */}
      <Search
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-3">
        <p className="font-bold text-base sm:text-lg">
          Total Food Items: {filteredItems.length}
        </p>

        <Button
          className="dark:bg-blue-700 bg-blue-600 text-white 
                     flex items-center justify-center gap-1 px-4 py-2 rounded"
          onClick={() => navigate("/food-item/add")}
        >
          Add <MdOutlineAdd />
        </Button>
      </div>

      {/* Sort (Mobile First) */}
      <div className="flex justify-end mt-4">
        <select
          className="border rounded px-3 py-2 text-sm outline-none cursor-pointer 
                     dark:bg-black bg-white w-full sm:w-auto font-bold"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort / Filter</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="price_asc">Amount ↑</option>
          <option value="price_desc">Amount ↓</option>
        </select>
      </div>

      {/* Table Header (Desktop Only) */}
      <div
        className="hidden sm:grid sm:grid-cols-5 gap-4 mt-6 
                      bg-amber-500 rounded-lg px-4 py-3 
                      font-bold text-black shadow"
      >
        <p>IMAGE</p>
        <p>NAME</p>
        <p>CATEGORY / TYPE</p>
        <p>AMOUNT</p>
        <p>ACTION</p>
      </div>

      {/* Food Items */}
      <div className="mt-4 space-y-3">
        {filteredItems.map((item) => (
          <FoodItemSummary key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
