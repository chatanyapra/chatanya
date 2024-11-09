import express from "express";
import passport from 'passport';
import {createUser, loginUser, logoutUser, verifyGoogleToken} from "../controller/authController.js";
const router = express.Router();

router.post("/signup", createUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

// Google auth routes
router.post("/google/token", verifyGoogleToken);

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//     res.redirect('/blogs');  // or send user info or token in response
// });



export default router;