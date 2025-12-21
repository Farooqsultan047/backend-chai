
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express";

const app = express();

( async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/backend chae`);
        app.on("error", (error) => {
            console.log("ERRR: ", error);
            throw error;
        });
    } catch (error) {
        console.log("Connection failed:", error);
    }
})();

app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
});

