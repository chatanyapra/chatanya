import express from "express";
import passport from 'passport';
import {createUser, loginUser, logoutUser} from "../controller/authController.js";
const router = express.Router();

router.post("/signup", createUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

// Google auth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        console.log(res);
        res.redirect('/'); // Change to where you want to redirect
    }
);

export default router;