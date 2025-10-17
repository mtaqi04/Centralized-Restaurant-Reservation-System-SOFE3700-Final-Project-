// Entry point of backend server
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./models/db.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));