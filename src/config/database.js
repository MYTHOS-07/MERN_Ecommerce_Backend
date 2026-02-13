import mongoose, { connect } from "mongoose";
import config from "./config.js";

async function connectDB() {
  try {
    const connectionStatus = await mongoose.connect(config.mongoDBurl);

    console.log(`Database Connected `);
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
