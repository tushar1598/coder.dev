import mongoose from "mongoose";

const Mongo_URL = "mongodb://0.0.0.0:27017/Food-Delivery-Admin";

const ConnectDB = async () => {
  try {
    await mongoose.connect(Mongo_URL);
    console.log("Connected to Database :: MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default ConnectDB;
