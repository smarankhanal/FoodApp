// import Input from "../Input";
// import Button from "../Button";
// import { MdEdit, MdOutlineAdd } from "react-icons/md";
// import Select from "../Select";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { editFoodItem, uploadFoodItem } from "../../store/managerSlice";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchSingleFoodItem } from "../../store/singleFoodItemSlice";

// export default function FoodManager() {
//   const { register, handleSubmit, reset, setValue } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [newImageSelected, setNewImageSelected] = useState(false);
//   const { id: foodItemId } = useParams();
//   const { loading } = useSelector((state) => state.foodManager);
//   const { foodItem } = useSelector((state) => state.singleFoodItem);
//   useEffect(() => {
//     if (foodItemId) {
//       dispatch(fetchSingleFoodItem(foodItemId));
//     } else {
//       reset({
//         foodName: "",
//         description: "",
//         price: "",
//         type: "",
//         subCategory: "",
//       });
//     }
//   }, [dispatch, foodItemId, reset]);
//   useEffect(() => {
//     if (foodItemId && foodItem) {
//       setValue("foodName", foodItem.foodName);
//       setValue("description", foodItem.description);
//       setValue("price", foodItem.price);
//       setValue("type", foodItem.type);
//       setValue("subCategory", foodItem.subCategory);
//     }
//   }, [foodItem, foodItemId, setValue]);
//   const submit = async (data) => {
//     try {
//       if (foodItemId) {
//         const updatedData = new FormData();
//         updatedData.append("foodName", data.foodName);
//         updatedData.append("description", data.description);
//         updatedData.append("price", data.price);
//         updatedData.append("type", data.type.toLowerCase());
//         updatedData.append("subCategory", data.subCategory.toLowerCase());
//         updatedData.append("foodImage", data.foodImage[0]);

//         await dispatch(editFoodItem({ foodItemId, updatedData })).unwrap();
//         navigate("/fooditem");
//       } else {
//         const formData = new FormData();
//         formData.append("foodName", data.foodName);
//         formData.append("description", data.description);
//         formData.append("price", data.price);
//         formData.append("type", data.type.toLowerCase());
//         formData.append("subCategory", data.subCategory.toLowerCase());
//         formData.append("foodImage", data.foodImage[0]);

//         await dispatch(uploadFoodItem(formData)).unwrap();
//         navigate("/fooditem");
//       }
//     } catch (err) {
//       console.error("Save failed:", err);
//       alert("Save failed. Please try again.");
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto font-serif p-4 rounded-lg">
//       <form onSubmit={handleSubmit(submit)}>
//         <Input
//           label="FoodItem : "
//           type="text"
//           {...register("foodName", { required: true })}
//         />
//         <div className="flex flex-row gap-2">
//           <Input
//             label="Image :"
//             type="file"
//             accept="image/*"
//             className="
//       [&::file-selector-button]:bg-blue-600
//       [&::file-selector-button]:text-white
//       [&::file-selector-button]:border-none
//       [&::file-selector-button]:px-4
//       [&::file-selector-button]:py-2
//       [&::file-selector-button]:rounded-md
//       [&::file-selector-button]:cursor-pointer
//       [&::file-selector-button]:hover:bg-blue-700
//     "
//             {...register("foodImage", { required: !foodItemId })}
//             onChange={(e) => setNewImageSelected(e.target.files.length > 0)}
//           />
//           {foodItemId && foodItem?.foodImage && !newImageSelected && (
//             <img
//               src={foodItem.foodImage}
//               alt={foodItem.foodName}
//               className="h-24 w-32 object-cover rounded-lg border mt-4"
//             />
//           )}
//         </div>

//         <Input
//           label="Description"
//           type="text"
//           {...register("description", { required: true })}
//         />

//         <div className="flex gap-4 w-full">
//           <div className="flex-1">
//             <Select
//               label="Type"
//               className="bg-gray-300 text-black"
//               {...register("type", { required: true })}
//             >
//               <option>Veg</option>
//               <option>Non-veg</option>
//             </Select>
//           </div>
//           <div className="flex-1">
//             <Select
//               label="Sub Category"
//               className="bg-gray-300 text-black"
//               {...register("subCategory", { required: true })}
//             >
//               <option>Starter</option>
//               <option>Main Course</option>
//               <option>Dessert</option>
//               <option>Beverage</option>
//             </Select>
//           </div>
//         </div>

//         <Input
//           label="Price"
//           type="number"
//           className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//           {...register("price", { required: true })}
//         />

//         <Button
//           type="submit"
//           className="bg-blue-600 text-white w-[120px] flex items-center justify-center gap-1 mt-2 ml-auto"
//           disabled={loading}
//         >
//           {loading
//             ? foodItemId
//               ? "Updating..."
//               : "Adding..."
//             : foodItemId
//             ? "Update"
//             : "Add"}
//           {!loading && (foodItemId ? <MdEdit /> : <MdOutlineAdd />)}
//         </Button>
//       </form>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { MdEdit, MdOutlineAdd } from "react-icons/md";
import Select from "../Select";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editFoodItem, uploadFoodItem } from "../../store/managerSlice";
import { fetchSingleFoodItem } from "../../store/singleFoodItemSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function FoodManager() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newImageSelected, setNewImageSelected] = useState(false);
  const { id: foodItemId } = useParams();
  const { loading } = useSelector((state) => state.foodManager);
  const { foodItem } = useSelector((state) => state.singleFoodItem);

  useEffect(() => {
    if (foodItemId) {
      dispatch(fetchSingleFoodItem(foodItemId));
    } else {
      reset({
        foodName: "",
        description: "",
        price: "",
        type: "",
        subCategory: "",
      });
    }
  }, [dispatch, foodItemId, reset]);

  useEffect(() => {
    if (foodItemId && foodItem) {
      reset({
        foodName: foodItem.foodName,
        description: foodItem.description,
        price: foodItem.price,
        subCategory: foodItem.subCategory,
        type: foodItem.type,
      });
    }
  }, [foodItem, foodItemId, reset]);

  const submit = async (data) => {
    const formData = new FormData();
    formData.append("foodName", data.foodName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("type", data.type.toLowerCase());
    formData.append("subCategory", data.subCategory.toLowerCase());

    if (data.foodImage && data.foodImage.length > 0) {
      formData.append("foodImage", data.foodImage[0]);
    }

    try {
      if (foodItemId) {
        await dispatch(editFoodItem({ foodItemId, formData })).unwrap();
      } else {
        await dispatch(uploadFoodItem(formData)).unwrap();
      }
      navigate("/fooditem");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed. Please try again.");
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
        <div className="flex flex-row gap-4 items-start">
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
            {...register("foodImage", { required: !foodItemId })}
            onChange={(e) => setNewImageSelected(e.target.files.length > 0)}
          />
          {foodItemId && foodItem?.foodImage && !newImageSelected && (
            <img
              src={foodItem.foodImage}
              alt={foodItem.foodName}
              className="h-24 w-32 object-cover rounded-lg border mt-4"
            />
          )}
        </div>
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
              <option value="veg">Veg</option>
              <option value="non-veg">Non-veg</option>
            </Select>
          </div>
          <div className="flex-1">
            <Select
              label="Sub Category"
              className="bg-gray-300 text-black"
              {...register("subCategory", { required: true })}
            >
              <option value="starter">Starter</option>
              <option value="main-course">Main Course</option>
              <option value="dessert">Dessert</option>
              <option value="beverage">Beverage</option>
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
          {loading
            ? foodItemId
              ? "Updating..."
              : "Adding..."
            : foodItemId
            ? "Update"
            : "Add"}
          {!loading && (foodItemId ? <MdEdit /> : <MdOutlineAdd />)}
        </Button>
      </form>
    </div>
  );
}
