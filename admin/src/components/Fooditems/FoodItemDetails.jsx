import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useCapitalize } from "../../hooks/useCapitalize";

export default function FoodItemDetails() {
  const capitalize = useCapitalize();
  const { foodItem } = useSelector((state) => state.singleFoodItem);

  return (
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
    </div>
  );
}
