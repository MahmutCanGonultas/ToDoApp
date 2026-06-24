import { pool } from "../db/pool";

export async function createTodo(userId: number, title: string) {
  const result = await pool.query(
    `INSERT INTO todos (user_id,title)
        VALUES ($1, $2)
        RETURNING id, user_id, title, completed, created_at
        `,
    [userId, title],
  );
  return result.rows[0];
}
