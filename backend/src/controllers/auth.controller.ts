import { Request, Response } from "express";
import { registerSchema } from "../schemas/auth.schema";
import { registerUser } from "../services/auth.service";
import { loginUser } from "../services/auth.service";
import { signToken } from "../utils/jwt";
import { loginSchema } from "../schemas/auth.schema";

// REGISTER
export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const { email, password } = result.data;
  const user = await registerUser(email, password);

  return res.status(201).json({ user });
}

// LOGIN
export async function login(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: "Invalid Input" });
  }

  const { email, password } = result.data;
  const user = await loginUser(email, password);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = signToken(user);
  return res.json({ token });
}
