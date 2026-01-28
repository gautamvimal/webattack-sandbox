import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import chatRoute from "./routes/chat.js";

/* ======================
   ENV SETUP
====================== */

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY missing. Server will not start.");
  process.exit(1);
}

/* ======================
   APP INIT
====================== */

const app = express();

/* ======================
   MIDDLEWARE
====================== */

// ✅ CORS – allow Netlify frontend (lock this down in prod)
app.use(
  cors({
    origin: "*", // Replace with your frontend domain in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Parse JSON bodies
app.use(express.json());

/* ======================
   RATE LIMITING
====================== */

// 20 requests per minute per IP for AI route
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  message: {
    reply: "Too many requests. Please slow down and try again in a minute.",
  },
});

app.use("/api/chat", chatLimiter);

/* ======================
   ROUTES
====================== */

app.use("/api/chat", chatRoute);

// Optional health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

/* ======================
   START SERVER
====================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
