// Configuration Fie

import dotenv from "dotenv";

dotenv.config();

const config = {
  appUrl: process.env.APP_URL,
  PORT: process.env.PORT || 5000,
  name: process.env.NAME || "",
  version: process.env.VERSION || "0.0.1",
  mongoDBurl: process.env.MONGODB_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
  khalti: {
    apiKey: process.env.KHALTI_API_KEY || "",
    apiUrl: process.env.KHALTI_API_URL || "",
    returnUrl: process.env.KHALTI_RETRUN_URL || "",
  },
  emailApiKey: process.env.EMAIL_API_KEY || "",
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || "",
    url: process.env.GEMINI_URL || "",
  },
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
};

export default config;
