import express from "express";
import passport from 'passport';
import {createUser, loginUser, logoutUser, verifyGoogleToken} from "../controller/authController.js";
const router = express.Router();

router.post("/signup", createUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

// Google auth routes
router.post("/google/token", verifyGoogleToken);




export default router;