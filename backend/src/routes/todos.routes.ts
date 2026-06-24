import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { create } from "../controllers/todos.controller";

const router = Router();

router.post("/", requireAuth, create);

export default router;
