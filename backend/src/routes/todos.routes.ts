import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { create, list, update, remove } from "../controllers/todos.controller";

const router = Router();

router.post("/", requireAuth, create);
router.get("/", requireAuth, list);
router.patch("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

export default router;
