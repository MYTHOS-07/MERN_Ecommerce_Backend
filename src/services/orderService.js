import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import crypto from "crypto";
import {
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_ONLINE,
} from "../constants/paymentMethod.js";
import {
  PAYMENT_STATUS_COMPLETED,
  PAYMENT_STATUS_FAILED,
} from "../constants/paymentStatus.js";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
} from "../constants/orderStatuses.js";
import { ADMIN } from "../constants/roles.js";
import { payViaKhalti, payViaStripe } from "../utils/payment.js";
import mongoose from "mongoose";

const getOrder = async (status) => {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  const orders = await Order.find(filter)
    .populate("orderItems.product")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");

  return orders;
};

const getOrdersByUser = async (status, userId) => {
  let filter = { user: userId };

  if (status) filter.status = status;

  const orders = await Order.find(filter)
    .populate("orderItems.product")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");

  return orders;
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("orderItems.product")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");

  if (!order) {
    throw { statusCode: 404, message: "Order Not Found" };
  }

  return order;
};

const createOrder = async (data, userId) => {
  const orderNumber = crypto.randomUUID();

  return await Order.create({ ...data, user: userId, orderNumber });
};

const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

const cancelOrder = async (id, user) => {
  const order = await getOrderById(id);

  if (!user.roles.includes(ADMIN) && order.user._id != user._id)
    throw {
      status: 403,
      message: "Access denied.",
    };

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CANCELLED },
    { new: true },
  );
};

const deleteOrder = async (id, user) => {
  const order = await getOrderById(id);

  if (order.user._id != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  return await Order.findByIdAndDelete(id);
};

// Payment  gateway

const orderPaymentViaKhalti = async (id, user) => {
  const order = await getOrderById(id);

  if (order.user._id != user._id) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  const transactionId = crypto.randomUUID();

  const orderPayment = await Payment.create({
    amount: order.totalPrice,
    method: PAYMENT_METHOD_ONLINE,
    transactionId,
  });

  await Order.findByIdAndUpdate(id, { payment: orderPayment._id });

  return await payViaKhalti({
    id,
    amount: order.totalPrice,
    purchaseOrderId: order.id,
    purchaseOrderName: order.orderItems[0].product.name,
    customer: order.user,
  });
};

const orderPaymentViaStripe = async (id, user) => {
  const order = await getOrderById(id);

  if (order.user._id != user._id) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  const orderPayment = await Payment.create({
    amount: order.totalPrice,
    method: PAYMENT_METHOD_CARD,
  });

  await Order.findByIdAndUpdate(id, { payment: orderPayment._id });

  return await payViaStripe({
    amount: order.totalPrice,
    OrderId: order.id,
    OrderName: order.orderItems[0].product.name,
    customer: order.user,
  });
};

const orderPaymentViaCash = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: PAYMENT_METHOD_CASH,
    amount: order.totalPrice,
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      payment: orderPayment._id,
      status: ORDER_STATUS_CONFIRMED,
    },
    { new: true },
  );
};

const confirmOrderPayment = async (id, status, user) => {
  const order = await getOrderById(id);

  if (order.user._id != user._id) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  const normalizedStatus = (status || "").toUpperCase();

  if (normalizedStatus !== PAYMENT_STATUS_COMPLETED) {
    return await Payment.findByIdAndUpdate(order.payment._id, {
      status: PAYMENT_STATUS_FAILED,
    });
  }

  await Payment.findByIdAndUpdate(order.payment._id, {
    status: PAYMENT_STATUS_COMPLETED,
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      status: ORDER_STATUS_CONFIRMED,
    },
    { new: true },
  );
};

const getOrdersByMerchant = async (merchantId, status) => {
  const filter = {
    "orderItems.createdBy": new mongoose.Types.ObjectId(merchantId),
  };

  if (status) filter.status = status;

  return await Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "orderItems",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $match: filter,
    },
    {
      $project: {
        "orderItems._id": 1,
        "orderItems.name": 1,
        "orderItems.brand": 1,
        "orderItems.category": 1,
        "orderItems.price": 1,
        orderNumber: 1,
        payment: 1,
        shippingAddress: 1,
        createdAt: 1,
        status: 1,
        totalPrice: 1,
        "user.name": 1,
        "user.email": 1,
        "user.address": 1,
        "user.phone": 1,
      },
    },
  ]);
};

export default {
  getOrder,
  createOrder,
  deleteOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  //order payment
  orderPaymentViaStripe,
  orderPaymentViaCash,
  orderPaymentViaKhalti,
  confirmOrderPayment,
  getOrdersByMerchant,
};
