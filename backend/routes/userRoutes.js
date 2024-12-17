import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar } from "../controller/userController.js";

const router = express.Router();

// router.get("/", protectRoute, getUserForSidebar)
router.post("/uservisit", getUserForSidebar)

export default router;