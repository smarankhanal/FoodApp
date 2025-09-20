import { MdEdit, MdOutlineReviews } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useCapitalize } from "../../hooks/useCapitalize";
import Button from "../Button";
import { fetchFoodReview } from "../../store/foodReviewSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FoodItemDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const capitalize = useCapitalize();
  const { foodItem } = useSelector((state) => state.singleFoodItem);
  const [seeReview, setSeeReview] = useState(false);
  const { reviews, loading, error } = useSelector((state) => state.review);

  const toggleReview = async (foodItemId) => {
    if (!seeReview) {
      await dispatch(fetchFoodReview(foodItemId)).unwrap();
    }
    setSeeReview((prev) => !prev);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-10">
      <div className="relative flex flex-col sm:flex-row bg-[#f6f6f6] dark:bg-[#000000] rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden">
        <img
          src={foodItem.foodImage}
          alt={foodItem.foodName}
          className="w-full sm:w-56 h-56 object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
        />

        <div
          className="absolute right-4 top-4 h-9 w-9 bg-gray-700 dark:bg-white rounded-full flex items-center justify-center hover:scale-110 cursor-pointer transition"
          title="Edit"
        >
          <MdEdit
            className="text-[22px] text-blue-600"
            onClick={() => navigate(`/food-item/edit/${foodItem._id}`)}
          />
        </div>

        <div className="p-4  flex flex-col justify-center gap-2 text-black dark:text-white">
          <p className="text-2xl font-bold text-amber-400">
            {foodItem.foodName}
          </p>
          <p className="text-sm opacity-80">{foodItem.description}</p>
          <p className="font-medium">
            Type :-
            <span
              className={
                foodItem.type.toLowerCase() === "non-veg"
                  ? "text-red-500 font-semibold"
                  : "text-green-500 font-semibold"
              }
            >
              {capitalize(foodItem.type)}
            </span>
          </p>
          <p className="font-medium">
            Subcategory :- {capitalize(foodItem.subCategory)}
          </p>
          <p className="font-bold text-xl mt-2 text-blue-600 ">
            Rs {foodItem.price}
          </p>
        </div>
      </div>

      <div className="text-center mt-6 sm:mt-10">
        <Button
          className={`${seeReview ? "bg-red-500" : "bg-blue-500"} text-white`}
          onClick={() => toggleReview(foodItem._id)}
        >
          {seeReview ? "Hide Review" : "See Review"}
        </Button>
      </div>

      {seeReview && (
        <div className="w-full max-w-3xl mx-auto mt-5 flex flex-wrap justify-center">
          {loading ? (
            <p>Loading reviews...</p>
          ) : error ? (
            <p className="text-red-500 font-semibold">{error.message}</p>
          ) : reviews?.length === 0 ? (
            <div className="w-full text-center text-amber-500 font-bold text-[25px] font-serif">
              <p className="flex items-center justify-center p-4">
                <MdOutlineReviews className="text-amber-500 mr-2" />
                No review yet
              </p>
            </div>
          ) : (
            reviews?.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow m-2 sm:m-4 w-full sm:w-[48%]"
              >
                <p className="font-semibold text-amber-500">
                  ★ {review.star_rating}/5
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.review_text}
                </p>
                <p className="text-sm text-gray-500">
                  By {review.user?.fullname || "Anonymous"}
                </p>
                <p className="float-right opacity-60 text-xs sm:text-sm">
                  -
                  {new Date(review.createdAt).toLocaleString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
