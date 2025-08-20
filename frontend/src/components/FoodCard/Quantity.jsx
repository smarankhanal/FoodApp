import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQty } from "../../store/cartSlice";

export default function Quantity({ item }) {
  const dispatch = useDispatch();
  const itemInCart = useSelector((state) =>
    state.cart.items.find((cartItem) => cartItem._id === item._id)
  );

  const quantity = itemInCart?.quantity || 0;
  return (
    <div className="flex flex-row items-center mb-2">
      <p className="dark:text-white">Quantity :-</p>
      <div className="mx-2 border border-amber-500 rounded-md overflow-hidden select-none">
        <button
          onClick={() => dispatch(decreaseQty(item._id))}
          className="px-2 py-1 bg-amber-500 hover:bg-amber-300 transition cursor-pointer"
        >
          -
        </button>
        <input
          type="text"
          readOnly
          value={quantity}
          className="w-8 text-center bg-white dark:bg-gray-900 text-black dark:text-white"
        />

        <button
          className="px-2 py-1 bg-amber-500  hover:bg-amber-300 transition cursor-pointer"
          onClick={() => dispatch(increaseQty(item._id))}
        >
          +
        </button>
      </div>
    </div>
  );
}
