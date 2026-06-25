import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todos.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

// Auth endpoint'lerine brute-force koruması: 15 dakikada max 10 istek
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many requests, please try again later" },
});

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/auth", authLimiter, authRoutes);
app.use("/todos", todoRoutes);

// Global error handler — Express 5'te async hatalar otomatik buraya iletilir
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
