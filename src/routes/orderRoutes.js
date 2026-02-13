import express from "express";
import orderController from "../controllers/orderController.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN, MERCHANT, USER } from "../constants/roles.js";

const router = express.Router();

router.get("/", roleBasedAuth(ADMIN), orderController.getOrder);

router.get("/user", orderController.getOrdersByUser);

router.get(
  "/merchant",
  roleBasedAuth(MERCHANT),
  orderController.getOrdersOfMerchant,
);

router.get("/:id", roleBasedAuth(ADMIN), orderController.getOrdersById);

router.post("/", orderController.createOrder);

router.put(
  "/:id/status",
  roleBasedAuth(ADMIN),
  orderController.updateOrderStatus,
);

router.put("/:id/cancel", orderController.cancelOrder);

router.delete("/:id", orderController.deleteOrder);

//Payment Routes
router.post("/:id/payment/khalti", orderController.orderPaymentViaKhalti);

router.put("/:id/confirm-payment", orderController.confirmOrderPayment);

router.post("/:id/payment/stripe", orderController.orderPaymentViaStripe);

router.post(
  "/:id/payment/cash",
  roleBasedAuth(USER),
  orderController.orderPaymentViaCash,
);

export default router;
