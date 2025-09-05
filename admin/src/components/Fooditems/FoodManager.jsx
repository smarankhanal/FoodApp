import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { MdOutlineAdd } from "react-icons/md";
import Select from "../Select";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadFoodItem } from "../../store/managerSlice";
import { useNavigate } from "react-router-dom";

export default function FoodManager() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.foodManager);
  const submit = async (data) => {
    const formData = new FormData();
    formData.append("foodName", data.foodName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("type", data.type.toLowerCase());
    formData.append("subCategory", data.subCategory.toLowerCase());
    formData.append("foodImage", data.foodImage[0]);

    try {
      await dispatch(uploadFoodItem(formData)).unwrap();
      navigate("/fooditem");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-serif p-4 rounded-lg">
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="FoodItem : "
          type="text"
          {...register("foodName", { required: true })}
        />

        <Input
          label="Image :"
          type="file"
          accept="image/*"
          className="
            [&::file-selector-button]:bg-blue-600
            [&::file-selector-button]:text-white
            [&::file-selector-button]:border-none
            [&::file-selector-button]:px-4
            [&::file-selector-button]:py-2
            [&::file-selector-button]:rounded-md
            [&::file-selector-button]:cursor-pointer
            [&::file-selector-button]:hover:bg-blue-700
          "
          {...register("foodImage", { required: true })}
        />

        <Input
          label="Description"
          type="text"
          {...register("description", { required: true })}
        />

        <div className="flex gap-4 w-full">
          <div className="flex-1">
            <Select
              label="Type"
              className="bg-gray-300 text-black"
              {...register("type", { required: true })}
            >
              <option>Veg</option>
              <option>Non-veg</option>
            </Select>
          </div>
          <div className="flex-1">
            <Select
              label="Sub Category"
              className="bg-gray-300 text-black"
              {...register("subCategory", { required: true })}
            >
              <option>Starter</option>
              <option>Main Course</option>
              <option>Dessert</option>
              <option>Beverage</option>
            </Select>
          </div>
        </div>

        <Input
          label="Price"
          type="number"
          className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...register("price", { required: true })}
        />

        <Button
          type="submit"
          className="bg-blue-600 text-white w-[120px] flex items-center justify-center gap-1 mt-2 ml-auto"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
          {!loading && <MdOutlineAdd />}
        </Button>
      </form>
    </div>
  );
}
