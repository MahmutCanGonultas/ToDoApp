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

export async function getTodos(userId: number) {
  const result = await pool.query(
    `
    SELECT id, user_id, title, completed, created_at
    FROM todos
    WHERE user_id =$1
    ORDER BY created_at DESC
    `,
    [userId],
  );

  return result.rows;
}

export async function updateTodo(
  userId: number,
  todoId: number,
  fields: { title?: string; completed?: boolean },
) {
  const result = await pool.query(
    `UPDATE todos
     SET title = COALESCE($1, title),
         completed = COALESCE($2, completed)
     WHERE id = $3 AND user_id = $4
     RETURNING id, user_id, title, completed, created_at`,
    [fields.title ?? null, fields.completed ?? null, todoId, userId],
  );

  return result.rows[0];
}

export async function deleteTodo(userId: number, todoId: number) {
  const result = await pool.query(
    `DELETE FROM todos
     WHERE id = $1 AND user_id = $2
     RETURNING id`,
    [todoId, userId],
  );

  // Satır bulunamazsa ya da başka kullanıcıya aitse rows boş gelir → undefined
  return result.rows[0];
}
