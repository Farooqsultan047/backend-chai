import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/backend chae")
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  }); 

 