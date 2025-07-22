import mongoose from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      match: [
        /^9\d{9}$/,
        "Phone number must start with 9 and be exactly 10 digits",
      ],
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    purchaseHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamp: true },
);
export const User = mongoose.model("User", userSchema);
