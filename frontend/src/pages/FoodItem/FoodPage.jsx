import { useSelector } from "react-redux";
import { Button, ReviewWithStars } from "../../components";
import { useEffect } from "react";
import { useCapitalize } from "../../hooks/useCapitalize";

export default function FoodPage() {
  const capitalize = useCapitalize();
  const item = useSelector((state) => state.singleFood.item);

  return (
    <div className=" bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')]  bgImage ">
      <div className=" w-full max-w-4xl mx-auto pt-20">
        <div
          className="flex flex-row  bg-[#f6f6f6] dark:bg-[#000000]  rounded-lg shadow-lg
                    drop-shadow-[2px_2px_5px_black] dark:drop-shadow-[2px_2px_5px_#FCFEFF] overflow-hidden hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
        >
          <img
            src={item.foodImage}
            alt="Food Item"
            className="w-48 object-cover rounded-l-lg"
          />
          <div className="p-4 flex flex-col justify-center space-y-2 flex-1 text-black dark:text-white">
            <p className="text-xl font-bold text-amber-400">{item.foodName}</p>
            <p className="font-semibold">{item.description} </p>
            <p className="font-bold">
              Type :-
              <span
                className={`${
                  item?.type?.toLowerCase() === "veg"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {capitalize(item.type)}
              </span>
            </p>
            <p className="font-semibold">
              Subcategory :- {capitalize(item.subCategory)}
            </p>
            <p className="font-bold text-lg mt-1">
              Price :-
              <span className="font-bold text-lg mt-2 text-blue-500">
                {item.price}
              </span>
            </p>
            <ReviewWithStars />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button className="px-6 py-2 text-black dark:text-white font-semibold rounded-lg shadow-md transition duration-300">
            Add Review
          </Button>
        </div>
      </div>
    </div>
  );
}
