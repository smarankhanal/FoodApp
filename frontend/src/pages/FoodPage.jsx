import Button from "../componets/Button";
import ReviewWithStars from "../componets/ReviewWithStars";
export default function FoodPage() {
  return (
    <div className=" bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')]  bgImage ">
      <div className=" w-full max-w-4xl mx-auto pt-20">
        <div
          className="flex flex-row  bg-[#f6f6f6] dark:bg-[#000000]  rounded-lg shadow-lg
                    drop-shadow-[2px_2px_5px_black] dark:drop-shadow-[2px_2px_5px_#FCFEFF] overflow-hidden hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
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
            <p className="font-bold text-lg mt-1">$12.99</p>
            <ReviewWithStars />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button className="px-6 py-2 text-black dark:text-white font-semibold rounded-lg shadow-md transition duration-300">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
