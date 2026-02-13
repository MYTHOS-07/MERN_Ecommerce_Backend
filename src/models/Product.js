import mongoose from "mongoose";

// For making Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Product name is required"] },
  brand: String,
  category: { type: String, required: [true, "Product category is required"] }, // Here we can pass the massage also
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [1, "Product price must be positive Value"],
  },
  createdAt: { type: Date, default: Date.now(), immutable: true }, // immutable means that data can't be changed
  stock: {
    // select:false, // value doesn't return as the preview after add of data in postman
    type: Number,
    default: 1,
    max: [10000, "Stock items must exceed 10000 items. "],
  },
  imageUrls: {
    type: [String], //this means image url meas a array
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Created by userId is required."],
  },
  description: String,
});

const model = mongoose.model("Product", productSchema); // making productSchema

export default model;
