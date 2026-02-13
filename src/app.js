import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";

import config from "./config/config.js";
import connectDB from "./config/database.js";

import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";

import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import oderRoutes from "./routes/orderRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const PORT = config.PORT;

connectDB();
connectCloudinary();

app.use(
  cors({
    origin: config.appUrl,
  }),
);

app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.PORT,
    status: "OK",
    version: config.version,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api/users", auth, upload.single("image"), userRoutes);
app.use("/api/orders", auth, oderRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`);
});
