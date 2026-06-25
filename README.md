# ToDo REST API

A personal to-do list REST API built with Node.js, TypeScript, Express and PostgreSQL (Neon).

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **Database:** PostgreSQL via `pg` (raw SQL, Neon serverless)
- **Auth:** JWT (`jsonwebtoken`) + `bcryptjs`
- **Validation:** Zod
- **Security:** `helmet`, `cors`, `express-rate-limit`

## Project Structure

```
backend/
├── src/
│   ├── controllers/   # Request/response handling
│   ├── services/      # Business logic + SQL queries
│   ├── routes/        # Express routers
│   ├── middlewares/   # requireAuth, errorHandler
│   ├── schemas/       # Zod validation schemas
│   ├── utils/         # JWT helpers
│   └── db/            # pg pool + schema.sql
├── .env.example
└── tsconfig.json
```

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in your values
npm run dev            # development with hot-reload
```

## Environment Variables

| Variable      | Description                                  | Example                              |
|---------------|----------------------------------------------|--------------------------------------|
| `DATABASE_URL`| PostgreSQL connection string (Neon)          | `postgresql://user:pass@host/db`     |
| `JWT_SECRET`  | Secret key for signing JWTs                  | `a-long-random-string`               |
| `PORT`        | HTTP port (optional, defaults to `3000`)     | `3000`                               |
| `CORS_ORIGIN` | Allowed frontend origin (optional)           | `http://localhost:5173`              |

## Scripts

| Command         | Description                      |
|-----------------|----------------------------------|
| `npm run dev`   | Start dev server (tsx watch)     |
| `npm run build` | Compile TypeScript → `dist/`     |
| `npm start`     | Run compiled build               |

## API Endpoints

### Auth

| Method | Path             | Auth | Body                              | Response                  |
|--------|------------------|------|-----------------------------------|---------------------------|
| POST   | `/auth/register` | —    | `{ email, password }`             | `201 { user }`            |
| POST   | `/auth/login`    | —    | `{ email, password }`             | `200 { token }`           |

> Rate limited: 10 requests per 15 minutes per IP.

### Todos

All todo endpoints require `Authorization: Bearer <token>`.

| Method | Path          | Auth | Body                              | Response                  |
|--------|---------------|------|-----------------------------------|---------------------------|
| POST   | `/todos`      | ✓    | `{ title: string (1–200 chars) }` | `201 { todo }`            |
| GET    | `/todos`      | ✓    | —                                 | `200 { todos[] }`         |
| PATCH  | `/todos/:id`  | ✓    | `{ title?, completed? }`          | `200 { todo }` / `404`    |
| DELETE | `/todos/:id`  | ✓    | —                                 | `204` / `404`             |

### Todo Object

```json
{
  "id": 1,
  "user_id": 3,
  "title": "Buy groceries",
  "completed": false,
  "created_at": "2026-06-25T10:00:00.000Z"
}
```

## Database Schema

```sql
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  email      TEXT UNIQUE NOT NULL,
  password   TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE todos (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  completed  BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
