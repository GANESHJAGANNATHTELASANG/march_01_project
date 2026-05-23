import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/march_fullstack");

    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Connection Error");

    console.log(err);
  }
};

export default connectToMongoDB;
