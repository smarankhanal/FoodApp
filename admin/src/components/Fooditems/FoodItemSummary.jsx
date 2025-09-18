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
  const [toast, setToast] = useState({ show: false, text: "", className: "" });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const captialize = useCapitalize();
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
        text: "Deleting the foodItem...",
        className: "text-green-500",
      });

      setTimeout(() => {
        setToast({ show: false, text: "", className: "" });
        dispatch(fetchFoodItem());
      }, 2000);
    } catch (error) {
      setToast({
        show: true,
        text: error.message || "Failed to delete fooditem",
        className: "text-red-500",
      });

      setTimeout(() => {
        setToast({ show: false, text: "", className: "" });
      }, 2000);
    }
  };

  return (
    <>
      {toast.show && (
        <Toast
          show={toast.show}
          text={toast.text}
          className={toast.className}
        />
      )}

      {confirmOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex  items-center justify-center z-50 cursor-not-allowed">
          <div className="flex flex-col bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this food item?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  deleteFood(item._id);
                  setConfirmOpen(false);
                }}
                className=" cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmOpen(false)}
                className="cursor-pointer px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 bg-black dark:bg-white rounded-lg m-4 p-2 dark:text-black text-white flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex-1">
          <img
            src={item.foodImage}
            alt={item.foodName}
            className="rounded-lg h-12 w-20 object-cover"
          />
        </div>

        <p className="flex-1">{captialize(item.foodName)}</p>
        <div className="flex flex-row sm:flex-col gap-2 flex-1">
          <p className="mb-1">{captialize(item.subCategory)}</p>

          <Status
            className={
              item.type.toLowerCase() === "non-veg"
                ? `text-red-500 drop-shadow-[2px_2px_red]`
                : `text-green-500 drop-shadow-[2px_2px_green]`
            }
          >
            {captialize(item.type)}
          </Status>
        </div>
        <p className="flex-1">Rs {item.price}</p>
        <div className="flex flex-1 gap-3">
          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03]"
            title="Delete FoodItem"
            onClick={() => setConfirmOpen(true)}
          >
            <MdDelete className="text-[20px] text-red-500" />
          </div>
          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03]"
            title="Edit FoodItems"
            onClick={() => navigate(`/food-item/edit/${item._id}`)}
          >
            <FaRegEdit className="text-[18px] text-blue-500" />
          </div>
          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03]"
            title="View FoodItems"
            onClick={() => viewFoodItems(item._id)}
          >
            <FaRegEye className="text-[18px] text-amber-500" />
          </div>
        </div>
      </div>
    </>
  );
}
