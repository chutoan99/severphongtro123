import express from "express";
import * as controllers from "../controllers/area";

const router = express.Router();
router.get("/", controllers.getAreas);

export default router;
