import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN } from "../constants/roles.js";
const router = express.Router();

router.post("/", roleBasedAuth(ADMIN), userController.createUser);

router.get("/", auth, roleBasedAuth(ADMIN), userController.getUsers);

router.get("/:id", roleBasedAuth(ADMIN), userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", roleBasedAuth(ADMIN), userController.deleteUser);

router.patch("/:id/profile-image", userController.updateUserProfileImage);

router.post("/merchant", roleBasedAuth(ADMIN), userController.getOrdersOfMerchant);

export default router;
