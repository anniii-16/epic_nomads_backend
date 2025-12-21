import express from "express";
import { getFood } from "../controllers/foodController.js";

const router = express.Router();
router.get("/nearby", getFood);

export default router;
