import express from "express";
import { getTouristPlaces } from "../controllers/touristController.js";
const router = express.Router();
router.get("/:city", getTouristPlaces);
export default router;
