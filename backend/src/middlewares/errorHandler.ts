import { Request, Response, NextFunction } from "express";

// Express, 4 parametreli middleware'i otomatik olarak error handler olarak tanır
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // Express 5'te async hatalar next'e iletilmeden de yakalanır; next yine de gerekli
  next: NextFunction,
) {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
