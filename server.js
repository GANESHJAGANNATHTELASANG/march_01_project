import express from "express";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import dotenv from "dotenv";

import cors from "cors";
import connectToMongoDB from "./db/db.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

app.get("/", (req, res) => {
  res.send("server is running in port 8787");
});

app.listen(8787, () => {
  connectToMongoDB();
  console.log("server is running in port 8787");
});
