import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Connection Error");

    console.log(err);
  }
};

export default connectToMongoDB;
