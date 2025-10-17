import { Router } from "express";
import * as ctrl from "../controllers/restaurantController.js";
const r = Router();

r.post("/", ctrl.createRestaurant);
r.get("/", ctrl.listRestaurants);
r.put("/:id", ctrl.updateRestaurant);
r.delete("/:id", ctrl.deleteRestaurant);

export default r;