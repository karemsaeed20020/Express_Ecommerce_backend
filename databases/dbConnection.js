import mongoose from "mongoose";

const dbConnection = async () => {
  return await mongoose
    .connect("mongodb://127.0.0.1:27017/Ecommerce-backend")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });
};
export default dbConnection;
