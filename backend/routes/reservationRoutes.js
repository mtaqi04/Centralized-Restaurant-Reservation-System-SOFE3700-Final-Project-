import { Router } from "express";
import * as ctrl from "../controllers/reservationController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
const r = Router();

r.post("/", requireAuth, ctrl.createReservation);
r.get("/", ctrl.listReservations);
r.get("/:id", ctrl.getReservation);
r.put("/:id", requireAuth, ctrl.updateReservation);
r.delete("/:id", requireAuth, requireRole("Admin"), ctrl.deleteReservation);

export default r;