import React, { useState } from "react";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Status from "../Status";
import { useCapitalize } from "../../hooks/useCapitalize";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteFoodItem,
  fetchSingleFoodItem,
} from "../../store/singleFoodItemSlice";
import { fetchFoodItem } from "../../store/foodItemSlice";
import { Toast } from "../../components";

export default function FoodItemSummary({ item }) {
  const [toast, setToast] = useState({
    show: false,
    text: "",
    className: "",
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const capitalize = useCapitalize();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewFoodItems = async (foodItemId) => {
    await dispatch(fetchSingleFoodItem(foodItemId)).unwrap();
    navigate(`/food-item/${foodItemId}`);
  };

  const deleteFood = async (foodItemId) => {
    try {
      await dispatch(deleteFoodItem(foodItemId)).unwrap();
      setToast({
        show: true,
        text: "Deleting the food item...",
        className: "text-green-500",
      });

      setTimeout(() => {
        setToast({ show: false, text: "", className: "" });
        dispatch(fetchFoodItem());
      }, 2000);
    } catch (error) {
      setToast({
        show: true,
        text: error.message || "Failed to delete food item",
        className: "text-red-500",
      });

      setTimeout(() => {
        setToast({ show: false, text: "", className: "" });
      }, 2000);
    }
  };

  return (
    <>
      {/* Toast */}
      {toast.show && (
        <Toast
          show={toast.show}
          text={toast.text}
          className={toast.className}
        />
      )}

      {/* Confirm Delete Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this food item?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  deleteFood(item._id);
                  setConfirmOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>

              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOD ITEM CARD ================= */}
      <div
        className="bg-black dark:bg-white dark:text-black text-white
                   rounded-lg shadow m-3 p-4
                   flex flex-col gap-3
                   sm:flex-row sm:items-center sm:gap-4"
      >
        {/* Image */}
        <img
          src={item.foodImage}
          alt={item.foodName}
          className="rounded-lg h-24 w-full object-cover
                     sm:h-12 sm:w-20"
        />

        {/* Name */}
        <p className="font-semibold text-lg sm:text-base sm:flex-1">
          {capitalize(item.foodName)}
        </p>

        {/* Category + Type */}
        <div className="flex flex-col gap-1 sm:flex-1">
          <p className="text-sm sm:text-base">{capitalize(item.subCategory)}</p>

          <Status
            className={
              item.type.toLowerCase() === "non-veg"
                ? "text-red-500 drop-shadow-[2px_2px_red]"
                : "text-green-500 drop-shadow-[2px_2px_green]"
            }
          >
            {capitalize(item.type)}
          </Status>
        </div>

        {/* Price */}
        <p className="font-bold sm:flex-1">Rs {item.price}</p>

        {/* Actions */}
        <div className="flex gap-4 justify-end sm:flex-1">
          <button
            title="Delete"
            onClick={() => setConfirmOpen(true)}
            className="bg-white dark:bg-black h-8 w-8 rounded-full
                       flex items-center justify-center
                       hover:scale-105 transition"
          >
            <MdDelete className="text-xl text-red-500" />
          </button>

          <button
            title="Edit"
            onClick={() => navigate(`/food-item/edit/${item._id}`)}
            className="bg-white dark:bg-black h-8 w-8 rounded-full
                       flex items-center justify-center
                       hover:scale-105 transition"
          >
            <FaRegEdit className="text-lg text-blue-500" />
          </button>

          <button
            title="View"
            onClick={() => viewFoodItems(item._id)}
            className="bg-white dark:bg-black h-8 w-8 rounded-full
                       flex items-center justify-center
                       hover:scale-105 transition"
          >
            <FaRegEye className="text-lg text-amber-500" />
          </button>
        </div>
      </div>
    </>
  );
}
