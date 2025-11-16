import { Router } from "express";
import * as ctrl from "./viewsController.js";
const router = Router();


/*ALL ROUTES WORK*/

router.get("/all-reservations", ctrl.views_all_reservations);
router.get("/over-average", ctrl.getGreaterThanAverageReservations);
router.get("/max-reservations", ctrl.getMaxReservations);
router.get("/res-by-restaurant", ctrl.numOfReservationsByRestaurant);
router.get("/all-emails", ctrl.viewAllEmails);

export default router;