import express from "express";
import userRouter from "./routes/user.router.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>Server running</h1>");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
