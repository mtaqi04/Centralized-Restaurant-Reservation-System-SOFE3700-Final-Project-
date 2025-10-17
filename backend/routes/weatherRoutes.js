import { Router } from "express";
import * as ctrl from "../controllers/weatherController.js";
const r = Router();

r.get("/:city", ctrl.getWeatherByCity);

export default r;