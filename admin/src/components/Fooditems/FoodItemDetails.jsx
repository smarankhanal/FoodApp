import { MdEdit } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useCapitalize } from "../../hooks/useCapitalize";
import Button from "../Button";
import { fetchFoodReview } from "../../store/foodReviewSlice";
import { useState } from "react";

export default function FoodItemDetails() {
  const dispatch = useDispatch();
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
    <>
      <div className="w-full max-w-3xl mx-auto p-10">
        <div className="relative flex bg-[#f6f6f6] dark:bg-[#000000] rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
          <img
            src={foodItem.foodImage}
            alt={foodItem.foodName}
            className="w-56 h-56 object-cover rounded-l-2xl"
          />
          <div
            className="absolute right-5 top-4 h-9 w-9 bg-gray-700 dark:bg-white rounded-full flex items-center justify-center hover:scale-110 cursor-pointer transition"
            title="Edit"
          >
            <MdEdit className="text-[22px] text-blue-600" />
          </div>
          <div className="p-6 flex flex-col justify-center gap-2 flex-1 text-black dark:text-white">
            <p className="text-2xl font-bold">{foodItem.foodName}</p>
            <p className="text-sm opacity-80 leading-relaxed">
              {foodItem.description}
            </p>
            <p className="font-medium">Type: {capitalize(foodItem.type)}</p>
            <p className="font-medium">
              Subcategory: {capitalize(foodItem.subCategory)}
            </p>
            <p className="font-bold text-xl mt-2 text-green-600 dark:text-green-400">
              Rs {foodItem.price}
            </p>
          </div>
        </div>

        <div className="text-center mt-20">
          <Button
            className={`${seeReview ? "bg-red-500" : "bg-blue-500"} text-white`}
            onClick={() => toggleReview(foodItem._id)}
          >
            {seeReview ? "Hide Review" : "See Review"}
          </Button>
        </div>

        <div className="w-full max-w-3xl mx-auto m-5">
          {seeReview ? (
            <div className="flex flex-wrap">
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
                    className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow m-4"
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
                    <p className="float-right opacity-60">
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
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
