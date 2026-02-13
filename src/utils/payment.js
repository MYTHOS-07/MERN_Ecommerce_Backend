import axios from "axios";
import config from "../config/config.js";
import Stripe from "stripe";

const payViaKhalti = async (data) => {
  if (!data) throw { message: "Payment data is required" };

  if (!data.amount) throw { message: "Payment amount is required" };

  if (!data.purchaseOrderId) throw { message: "Payment order Id is required" };

  if (!data.purchaseOrderName)
    throw { message: "Payment Order Name is required" };

  if (!config.khalti.apiKey) throw { message: "Khalti API key is missing" };
  if (!config.khalti.apiUrl) throw { message: "Khalti API URL is missing" };

  const body = {
    return_url: `${config.appUrl}/orders/${data.id}/payment`,
    website_url: config.appUrl,
    amount: data.amount,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: {
      name: data.customer?.name,
      email: data.customer?.email,
      phone: data.customer?.phone,
    },
  };

  const response = await axios.post(config.khalti.apiUrl, body, {
    headers: {
      Authorization: `Key ${config.khalti.apiKey}`,
    },
  });

  return response.data;
};

const payViaStripe = async (data) => {
  const stripe = new Stripe(config.stripeSecretKey);

  const response = await stripe.paymentIntents.create({
    amount: Number(data.amount),
    currency: data.currency || "npr",
    metadata: {
      order_id: data.OrderId,
      order_name: data.OrderName,
      customer_name: data.customer?.name,
      customer_email: data.customer?.email,
      customer_phone: data.customer?.phone,
    },
  });

  return response;
};

export { payViaKhalti, payViaStripe };
