import mongoose from "mongoose";
import express from "express";

const app = express();

(async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/backend_chae"
    );
    console.log("MongoDB connected");

  } catch (error) {
    console.log("Connection failed:", error);
  }
})();  

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("<h1>Server is running!</h1>");
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`); 
});  

