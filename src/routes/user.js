import express from "express";
import * as controllers from "../controllers/user";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();
router.use(verifyToken);
router.get("/", controllers.getOne);

export default router;
