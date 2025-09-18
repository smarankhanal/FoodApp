import { useDispatch, useSelector } from "react-redux";
import { ReviewWithStars } from "../../components";
import { useEffect } from "react";
import { useCapitalize } from "../../hooks/useCapitalize";
import { fetchReviews } from "../../store/reviewSlice";
import { MdOutlineReviews } from "react-icons/md";
import { useParams } from "react-router-dom";

export default function FoodPage() {
  const capitalize = useCapitalize();
  const item = useSelector((state) => state.singleFood.item);
  const dispatch = useDispatch();
  const foodItemId = useParams().id;
  useEffect(() => {
    dispatch(fetchReviews(foodItemId));
  }, [dispatch, foodItemId]);
  const { reviewsByFood, loading } = useSelector((state) => state.review);

  const reviews = reviewsByFood[item?._id] || [];

  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bgImage">
      <div className="w-full max-w-4xl mx-auto pt-20 px-4">
        <div
          className="flex flex-col sm:flex-row bg-[#f6f6f6] dark:bg-[#000000] rounded-lg shadow-lg
                 drop-shadow-[2px_2px_5px_black] dark:drop-shadow-[2px_2px_5px_#FCFEFF] overflow-hidden
                 hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
        >
          <img
            src={item.foodImage}
            alt="Food Item"
            className="w-full sm:w-48 h-48 object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
          />
          <div className="p-4 flex flex-col justify-center space-y-2 text-black dark:text-white flex-1">
            <p className="text-xl sm:text-2xl font-bold text-amber-400">
              {capitalize(item.foodName)}
            </p>
            <p className="font-semibold text-sm sm:text-base">
              {item.description}
            </p>
            <p className="font-bold text-sm sm:text-base">
              Type :-{" "}
              <span
                className={
                  item?.type?.toLowerCase() === "veg"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {capitalize(item.type)}
              </span>
            </p>
            <p className="font-semibold text-sm sm:text-base">
              Subcategory :- {capitalize(item.subCategory)}
            </p>
            <p className="font-bold text-lg sm:text-xl mt-1">
              Price :- <span className="text-blue-500">{item.price}</span>
            </p>
            <ReviewWithStars itemId={item._id} />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full max-w-3xl mx-auto m-5 px-2">
        <div className="flex flex-col sm:flex-wrap font-bold">
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews?.length === 0 ? (
            <div className="w-full text-center text-amber-500 font-bold text-[20px] sm:text-[25px] font-serif">
              <p className="flex items-center justify-center p-4">
                <MdOutlineReviews className="text-amber-700  mr-2" />
                <span className="text-amber-700"> No review yet</span>
              </p>
            </div>
          ) : (
            reviews?.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow m-2 sm:m-4"
              >
                <p className="font-semibold text-amber-500">
                  ★ {review.star_rating}/5
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  {review.review_text}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  By {review.user?.fullname || "Anonymous"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
