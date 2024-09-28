import mongoose from "mongoose";

const connectDB = async () => {
  const URL = "";
  mongoose
    .connect(URL)
    .then(() => {
      console.log("database in connected successfully");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default connectDB;
