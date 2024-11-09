import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../securityToken/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Route for verifying the Google token
export const verifyGoogleToken = asyncHandler(async (req, res) => {
    const { id_token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const googleId = payload["sub"];

        let user = await User.findOne({ googleId });

        // If user doesn’t exist, create a new user
        if (!user) {
            user = await User.create({
                username: payload["name"],
                googleId,
                image: payload["picture"],
                isAdmin: false,
            });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            image: user.image
        });
    } catch (error) {
        console.error("Error verifying Google ID token:", error);
        res.status(500).json({ message: "Token verification failed" });
    }
});

export const createUser = asyncHandler(async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are mandatory!" });
        }
        if (confirmPassword !== password) {
            return res.status(400).json({ error: "Passwords don't match!" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in Signup Controller", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// other routes...


// login public
export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPassword = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPassword) {
            res.status(400).json({ error: "Invalid password or username" });
            return;
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            image: user.image
        });
    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// logout public
export const logoutUser = asyncHandler(async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout Successfully!" });
    } catch (error) {
        console.log("Error in Logout Controller", error.message);
        res.status(400).json({ message: "Internal Server Error!" });
    }
});
