import { Router } from "express";
import * as ctrl from "../controllers/customerController.js";
const r = Router();

r.get("", ctrl.listCustomers);
r.post("/create", ctrl.createCustomer);
r.put("/:id", ctrl.updateCustomer);
r.delete("/:id", ctrl.deleteCustomer);

export default r;