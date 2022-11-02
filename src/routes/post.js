import express from "express";
import * as controllers from "../controllers/post";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();
router.get("/all", controllers.getPosts);
router.get("/limit", controllers.getPostsLimit);
router.get("/getNewPosts", controllers.getNewPosts);

router.post("/createNewPost", verifyToken, controllers.createPosts);
router.get("/getLimitAdmin", verifyToken, controllers.getPostLimitAmin);

export default router;
