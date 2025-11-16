import { Router } from "express";
import * as ctrl from "./viewsController.js";
const router = Router();


/*ALL ROUTES WORK*/

//Common Views
router.get("/all-reservations", ctrl.views_all_reservations);
router.get("/over-average", ctrl.getGreaterThanAverageReservations);
router.get("/max-reservations", ctrl.getMaxReservations);
router.get("/res-by-restaurant", ctrl.numOfReservationsByRestaurant);
router.get("/all-emails", ctrl.viewAllEmails);


//Custom Views
router.get("/average-reservation", ctrl.averageReservation);


//need to fix
//sqlMessage: "Illegal mix of collations for operation ' IN '"
//UPDATE
//Fixed, but had to remove WHERE Clause due to collation
router.get("/reservations-by-day", ctrl.reservationsByDay);
//

router.get("/frequent-customers", ctrl.frequentCustomers);
router.get("/available-tables", ctrl.availableTables);
router.get("/open-late", ctrl.openLate);

export default router;