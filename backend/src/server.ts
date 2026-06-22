import express, { Request, Response } from "express";
import { pool } from "./db/pool";

const app = express();
const PORT = 3000;

app.get("/db-health", async (req: Request, res: Response) => {
  const usersResult = await pool.query("SELECT COUNT(*) FROM users");
  const todosResult = await pool.query("SELECT COUNT(*) FROM todos");

  res.json({
    db: "connected",
    users: Number(usersResult.rows[0].count),
    todos: Number(todosResult.rows[0].count),
  });
});
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
