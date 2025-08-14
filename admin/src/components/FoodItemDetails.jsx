import { MdDelete, MdEdit } from "react-icons/md";

export default function FoodItemDetails() {
  return (
    <div>
      <div className="relative w-full max-w-3xl mx-auto p-20">
        <div
          className="flex flex-row  bg-[#f6f6f6] dark:bg-[#000000]  rounded-lg shadow-lg
                    drop-shadow-[2px_2px_5px_black] dark:drop-shadow-[2px_2px_5px_#FCFEFF] "
        >
          <img
            src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ="
            alt="Food Item"
            className="w-48 object-cover rounded-l-lg"
          />
          <div
            className="h-6 w-6 bg-gray-700 dark:bg-white rounded-full flex items-center justify-center absolute right-0 top-1 hover:scale-[1.1] cursor-pointer"
            title="Delete"
          >
            <MdDelete className="text-[20px] text-red-600" />
          </div>
          <div
            className="h-6 w-6 bg-gray-700 dark:bg-white rounded-full flex items-center justify-center absolute right-9 top-1 hover:scale-[1.1] cursor-pointer"
            title="Edit"
          >
            <MdEdit className="text-[20px] text-blue-600" />
          </div>
          <div className="p-4 flex flex-col justify-center space-y-2 flex-1 text-black dark:text-white">
            <p className="text-xl font-bold">Food Item</p>
            <p className="text-sm opacity-90">
              A delicious description of the food item goes here.
            </p>
            <p className="font-semibold">Type: Main Course</p>
            <p className="font-semibold">Subcategory: Vegetarian</p>
            <p className="font-bold text-lg mt-1">$12.99</p>
          </div>
        </div>
      </div>
    </div>
  );
}
