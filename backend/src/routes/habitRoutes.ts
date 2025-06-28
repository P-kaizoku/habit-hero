import express from "express";
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  markHabitDone,
} from "../controllers/habitController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authenticateToken); // All routes below are protected

router.get("/", getHabits);
router.post("/", createHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.post("/:id/track", markHabitDone);

export default router;
