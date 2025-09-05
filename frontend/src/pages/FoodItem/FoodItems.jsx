// import React, { useEffect } from "react";
// import { FoodCard } from "../../components";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFoodItems } from "../../store/foodItemSlice";

// export default function FoodItems() {
//   const { items } = useSelector((state) => state.foodItems);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchFoodItems());
//   }, []);
//   return (
//     <div className=" bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')]  bgImage pt-20">
//       <div className="grid grid-cols-3 m-2">
//         {items.map((item) => (
//           <FoodCard key={item._id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { FoodCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodItems } from "../../store/foodItemSlice";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function FoodItems() {
  const { items, loading } = useSelector((state) => state.foodItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoodItems());
  }, [dispatch]);

  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bgImage pt-20">
      <div className="grid grid-cols-3 gap-4 m-2">
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
          : items.map((item) => <FoodCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}
