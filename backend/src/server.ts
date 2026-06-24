import "dotenv/config";
import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todos.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
