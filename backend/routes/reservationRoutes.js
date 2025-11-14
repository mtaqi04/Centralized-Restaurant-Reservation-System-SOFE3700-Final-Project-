import { Router } from "express";
import { getReservation, getAllReservations } from "../controllers/reservationController.js";

const router = Router();

// GET /api/reservations/:id → reservation details + weather
router.get("/get-all", getAllReservations);
router.get("/:id", getReservation);

export default router;
