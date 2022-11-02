import express from "express";
import * as controllers from "../controllers/price";

const router = express.Router();
router.get("/", controllers.getPrices);

export default router;
