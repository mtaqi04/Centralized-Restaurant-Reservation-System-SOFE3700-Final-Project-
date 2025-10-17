import { Router } from "express";
import * as ctrl from "../controllers/customerController.js";
const r = Router();

r.post("/", ctrl.createCustomer);
r.get("/", ctrl.listCustomers);
r.put("/:id", ctrl.updateCustomer);
r.delete("/:id", ctrl.deleteCustomer);

export default r;