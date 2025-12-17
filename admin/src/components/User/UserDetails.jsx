import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { fetchFoodReviewOfUser } from "../../store/foodReviewSlice";
import { useParams } from "react-router-dom";
import { MdOutlineReviews } from "react-icons/md";
export default function UserDetails() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.singleUser);
  const [seeReview, setSeeReview] = useState(false);
  const userId = useParams();
  const { reviewsByUser, loading, error } = useSelector(
    (state) => state.review
  );

  const toggleReview = async (userId) => {
    if (!seeReview) {
      await dispatch(fetchFoodReviewOfUser(userId)).unwrap();
    }
    setSeeReview((prev) => !prev);
  };
  return (
    <div className=" flex-1 flex-col flex items-center justify-center font-serif">
      <div className="flex items-center justify-center w-15 h-15 rounded-full border-4 border-amber-600">
        <FaUserCircle className="w-12 h-12 text-gray-700 dark:text-gray-300" />
      </div>
      <div className="flex flex-col items-center justify-center dark:text-white text-black">
        <p className="m-1 text-black dark:text-white text-2xl font-bold">
          {user.fullname}
        </p>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.phoneNumber}</p>
        <div className="mt-2 text-center">
          <p className="opacity-80 mb-4">{user.address}</p>
          <a
            href={`https://www.google.com/maps?q=${user.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow transition duration-200"
          >
            View on Google Maps
          </a>
        </div>
      </div>
      <div className="text-center mt-20">
        <Button
          className={`${seeReview ? "bg-red-500" : "bg-blue-500"} text-white`}
          onClick={() => toggleReview(userId)}
        >
          {seeReview ? "Hide Review" : "See Review"}
        </Button>
      </div>

      <div className="w-full max-w-3xl mx-auto m-5">
        {seeReview ? (
          <div className="flex flex-wrap">
            {loading ? (
              <p className="text-black">Loading reviews...</p>
            ) : error ? (
              <p className="text-red-500 font-semibold">{error.message}</p>
            ) : reviewsByUser?.length === 0 ? (
              <div className="w-full text-center text-amber-500 font-bold text-[25px] font-serif">
                <p className="flex items-center justify-center p-4">
                  <MdOutlineReviews className="text-amber-500 mr-2" />
                  No review yet
                </p>
              </div>
            ) : (
              reviewsByUser?.map((review) => (
                <div
                  key={review._id}
                  className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow m-4"
                >
                  <p className="text-amber-500">{review.foodItem.foodName}</p>
                  <img
                    src={review.foodItem.foodImage}
                    className="rounded-lg h-20 w-fit"
                  />
                  <p className="font-semibold text-amber-500">
                    ★ {review.star_rating}/5
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {review.review_text}
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
  );
}
