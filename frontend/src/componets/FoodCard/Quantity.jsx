import React, { useState } from "react";

export default function Quantity() {
  const [quantity, setQuantity] = useState(0.5);
  const increaseQty = () => setQuantity((q) => q + 0.5);
  const decreaseQty = () => setQuantity((q) => (q > 0.5 ? q - 0.5 : 0.5));
  return (
    <div className="flex flex-row items-center mb-2">
      <p className="dark:text-white">Quantity :-</p>
      <div className="mx-2 border border-amber-500 rounded-md overflow-hidden select-none">
        <button
          onClick={decreaseQty}
          className="px-2 py-1 bg-amber-500 hover:bg-amber-300 transition cursor-pointer"
        >
          –
        </button>
        <input
          type="text"
          readOnly
          value={quantity}
          className="w-8 text-center bg-white dark:bg-gray-900 text-black dark:text-white"
        />
        <button
          onClick={increaseQty}
          className="px-2 py-1 bg-amber-500  hover:bg-amber-300 transition cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}
