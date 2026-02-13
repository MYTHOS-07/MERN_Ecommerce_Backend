import mongoose from "mongoose";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "../constants/orderStatuses.js"

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "User is required."],
    ref: "User",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Product is required."],
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
        min: [1, "Quantity must be greater than 1."],
      },
    },
  ],
  status: {
    type: String,
    default: ORDER_STATUS_PENDING,
    enum: [
      ORDER_STATUS_PENDING,
      ORDER_STATUS_CONFIRMED,
      ORDER_STATUS_SHIPPED,
      ORDER_STATUS_DELIVERED,
      ORDER_STATUS_CANCELLED,
    ],
  },
  shippingAddress: {
    city: {
      type: String,
      required: [true, "Shipping address city is required."],
    },
    province: {
      type: String,
      required: [true, "Shipping address province is required."],
    },
    street: String,
    country: {
      type: String,
      default: "Nepal",
    },
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required."],
  },
  orderNumber: {
    type: String,
    required: [true, "Order number is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  payment: {
    type: mongoose.Schema.ObjectId,
    ref: "Payment",
  },
});

const model = mongoose.model("Order", orderSchema);

export default model;
