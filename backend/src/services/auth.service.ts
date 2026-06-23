import bcrypt from "bcryptjs";
import { pool } from "../db/pool";

// REGISTER
export async function registerUser(email: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (email, password)
     VALUES ($1, $2)
     RETURNING id, email, created_at`,
    [email, passwordHash],
  );

  console.log(result);
  return result.rows[0];
}

// LOGIN
export async function loginUser(email: string, password: string) {
  const result = await pool.query(
    `SELECT id, email, password FROM users WHERE email = $1`,
    [email],
  );

  const user = result.rows[0];
  if (!user) {
    return null;
  }

  const passwordMathces = await bcrypt.compare(password, user.password);
  if (!passwordMathces) {
    return null;
  }

  return { id: user.id, email: user.email };
}
