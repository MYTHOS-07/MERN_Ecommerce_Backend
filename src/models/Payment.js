import mongoose from "mongoose";
import {
  PAYMENT_STATUS_COMPLETED,
  PAYMENT_STATUS_FAILED,
  PAYMENT_STATUS_PENDING,
} from "../constants/paymentStatus.js";
import {
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_ONLINE,
} from "../constants/paymentMethod.js";

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Amount is Required"],
  },
  method: {
    type: String,
    required: [true, "Payment method is Required"],
    enum: [PAYMENT_METHOD_CASH, PAYMENT_METHOD_CARD, PAYMENT_METHOD_ONLINE],
  },
  status: {
    type: String,
    default: PAYMENT_STATUS_PENDING,
    enum: [
      PAYMENT_STATUS_PENDING,
      PAYMENT_STATUS_COMPLETED,
      PAYMENT_STATUS_FAILED,
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  transactionId: String,
});

const model = mongoose.model("Payment", paymentSchema);

export default model;
