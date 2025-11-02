import express from "express";
import { getFood } from "../controllers/foodController.js";
const router = express.Router();
router.get("/:city", getFood);
export default router;
