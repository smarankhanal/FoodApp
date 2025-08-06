import Button from "./Button";

export default function FoodPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div
        className="flex flex-row bg-yellow-400 dark:bg-yellow-500 rounded-lg shadow-lg
                   drop-shadow-md dark:drop-shadow-[2px_2px_5px_#FCFEFF] overflow-hidden"
      >
        <img
          src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ="
          alt="Food Item"
          className="w-48 object-cover rounded-l-lg"
        />
        <div className="p-4 flex flex-col justify-center space-y-2 flex-1 text-black dark:text-white">
          <p className="text-xl font-bold">Food Item</p>
          <p className="text-sm opacity-90">
            A delicious description of the food item goes here.
          </p>
          <p className="font-semibold">Type: Main Course</p>
          <p className="font-semibold">Subcategory: Vegetarian</p>
          <p className="font-bold text-lg mt-2">$12.99</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="px-6 py-2 bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-black dark:text-white font-semibold rounded-lg shadow-md transition duration-300">
          Order Now
        </Button>
      </div>
    </div>
  );
}
