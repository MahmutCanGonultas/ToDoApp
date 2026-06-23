import "dotenv/config";
import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import { pool } from "./db/pool";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
