import mongoose from "mongoose";
import { ADMIN, MERCHANT, USER } from "../constants/roles.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required."],
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    trim: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "User password is required"],
    minLength: [6, "Password length must be greater than 6"],
  },
  roles: {
    type: [String],
    default: [USER],
    enum: [USER, ADMIN, MERCHANT],
  },
  address: {
    city: {
      type: String,
      required: [true, "User City address is required"],
    },
    country: {
      type: String,
      default: "Nepal",
    },
    province: {
      type: String,
      required: [true, "User province is required"],
    },
    street: { type: String },
  },
  phone: {
    type: String,
    required: [true, "User phone number is required"],
    unique: [true, "Phone number must be unique"],
  },
  profileImageUrl: { type: String },
  createdAT: { type: Date, default: Date.now(), immutable: true },
});

const model = mongoose.model("User", userSchema);

export default model;
