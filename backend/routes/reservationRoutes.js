import { Router } from "express";
import { getReservation } from "../controllers/reservationController.js";

const router = Router();

// GET /api/reservations/:id → reservation details + weather
router.get("/:id", getReservation);

export default router;
