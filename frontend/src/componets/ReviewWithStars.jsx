import { useState } from "react";

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

export default function ReviewWithStars() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="flex flex-col space-y-2">
      <p className="font-semibold text-lg dark:text-white opacity-70">
        Review :-
      </p>
      <div className="flex items-center space-x-4">
        <StarRating rating={rating} setRating={setRating} />
        <textarea
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
          className="border border-gray-300 rounded-md px-2 py-1 w-64 hover:border-amber-500 dark:text-white"
        />
      </div>
    </div>
  );
}
