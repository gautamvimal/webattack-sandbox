import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";

const app = express();

// ✅ ALLOW FRONTEND
app.use(cors({
  origin: true,
  credentials: true
}));


app.use(express.json());

// routes
app.use("/api/chat", chatRoute);

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});