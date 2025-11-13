import express from "express";
import { login, logout } from "../controllers/authController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();


// Generic Login Logout Routes
router.post("/login", login);
router.post("/logout", verifyToken, logout);


// Custom Specific User Routes
// ADMIN ONLY
router.get(
  "/admin/data",
  verifyToken,
  requireRole(["admin"]),
  (req, res) => {
    res.json({ message: "Admin access granted", user: req.user });
  }
);

// RESTAURANT OWNER ONLY
router.get(
  "/owner/dashboard",
  verifyToken,
  requireRole(["owner", "admin"]),
  (req, res) => {
    res.json({ message: "Owner access granted", user: req.user });
  }
);

// CUSTOMER ONLY
router.get(
  "/customer/profile",
  verifyToken,
  requireRole(["customer", "admin"]),
  (req, res) => {
    res.json({ message: "Customer access granted", user: req.user });
  }
);


export default router;
