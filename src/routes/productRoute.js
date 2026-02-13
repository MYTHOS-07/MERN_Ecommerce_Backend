//Routes only

import express from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { MERCHANT } from "../constants/roles.js";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getProducts);

router.get("/total", productController.getTotalCount);

router.get("/brands", productController.getBrand);

router.get("/categories", productController.getCategory);

// router.get("/users/:id", productController.getProductById);

router.get("/:id", productController.getProductById);

router.post(
  "/",
  auth,
  roleBasedAuth(MERCHANT),
  productController.createProduct,
); // between middleware

router.put(
  "/:id",
  auth,
  roleBasedAuth(MERCHANT),
  productController.updateProduct,
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth(MERCHANT),
  productController.deleteProduct,
);

export default router;
