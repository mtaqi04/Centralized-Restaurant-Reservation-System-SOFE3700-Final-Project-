import { Router } from "express";
import * as ctrl from "../controllers/reservationController.js";

const router = Router();

// GET /api/reservations/:id → reservation details + weather
router.get("/:id", ctrl.getReservation);
router.post("/", ctrl.createReservation);
router.put("/:id", ctrl.updateReservation);
router.delete("/:id", ctrl.deleteReservation);

export default router;
