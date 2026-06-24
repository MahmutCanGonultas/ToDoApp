import { Request, Response } from "express";
import { createTodo } from "../services/todos.service";

export async function create(req: Request, res: Response) {
  const userId = req.userId!;
  const { title } = req.body;

  const todo = await createTodo(userId, title);

  return res.status(201).json({ todo });
}
