import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import cors from "cors";
import connectToMongoDB from "./db/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(process.env.PORT || 8787, () => {
  connectToMongoDB();
  console.log("server is running");
});
