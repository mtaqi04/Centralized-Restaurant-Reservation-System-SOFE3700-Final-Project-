import { Router } from "express";
import * as ctrl from "./postCommandsController.js";
const router = Router();


router.post("/new-reservation", ctrl.p_createReservation);
router.post("/new-customer", ctrl.p_createCustomer);

export default router;