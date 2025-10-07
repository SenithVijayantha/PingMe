import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./config/db.js";

const app = express();
const port = process.env.PORT || 5001;
// const server = http.createServer(app);

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.send("Server is listening");
});

// connect DB and start server
try {
  await connectDB();
  app.listen(port, () => console.log("Server started on PORT:", port));
} catch (error) {
  console.error(error);
}