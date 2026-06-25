import { Request, Response } from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../services/todos.service";
import { createTodoSchema, updateTodoSchema } from "../schemas/todos.schema";

export async function create(req: Request, res: Response) {
  const result = createTodoSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const userId = req.userId!;
  const { title } = result.data;

  const todo = await createTodo(userId, title);

  return res.status(201).json({ todo });
}

export async function list(req: Request, res: Response) {
  const userId = req.userId!;

  const todos = await getTodos(userId);

  return res.json({ todos });
}

export async function update(req: Request, res: Response) {
  const result = updateTodoSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const userId = req.userId!;
  const todoId = Number(req.params.id);
  const { title, completed } = result.data;

  const todo = await updateTodo(userId, todoId, { title, completed });

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  return res.json({ todo });
}

export async function remove(req: Request, res: Response) {
  const userId = req.userId!;
  const todoId = Number(req.params.id);

  const deleted = await deleteTodo(userId, todoId);

  if (!deleted) {
    return res.status(404).json({ error: "Todo not found" });
  }

  return res.status(204).send();
}
