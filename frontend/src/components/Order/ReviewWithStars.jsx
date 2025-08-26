import { useState } from "react";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/reviewSlice";
import { useForm } from "react-hook-form";

function StarRating({ rating, setRating }) {
  return (
    <div className="flex space-x-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className={`text-2xl ${
            star <= rating ? "text-amber-400" : "text-gray-400"
          }`}
          role="button"
          aria-label={`${star} Star`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewWithStars({ itemId }) {
  const dispatch = useDispatch();
  const { handleSubmit, register, reset } = useForm();
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submit = (data) => {
    if (!rating) {
      alert("Rating is required");
      return;
    }
    const reviewData = {
      review_text: data.review,
      star_rating: rating,
    };

    dispatch(addReview({ reviewData, foodItemId: itemId }));
    setIsSubmitted(true);
    reset();
  };
  return (
    <>
      {isSubmitted ? (
        <p className="text-green-600 font-bold text-center">
          Review Submitted Successfully
        </p>
      ) : (
        <div className="flex flex-col space-y-2">
          <p className="font-semibold text-lg dark:text-white opacity-70">
            Review :-
          </p>
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex items-center space-x-4">
              <StarRating rating={rating} setRating={setRating} />
              <textarea
                type="text"
                {...register("review", { required: true })}
                placeholder="Write your review"
                className="border border-gray-300 rounded-md px-2 py-1 w-64 hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:text-white"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                className="px-6 py-2 text-black dark:text-white font-semibold rounded-lg shadow-md transition duration-300"
                type="submit"
              >
                Add Review
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
