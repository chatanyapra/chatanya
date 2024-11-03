import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../securityToken/generateToken.js";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from "dotenv";

dotenv.config();

// Google authentication setup
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5001/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = await User.create({
                username: profile.displayName,
                googleId: profile.id,
                image: profile._json.picture,
                isAdmin: false
            });
        }

        generateTokenAndSetCookie(user._id, done);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// signup public
export const createUser = asyncHandler(async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are mandatory!" });
        }
        if (confirmPassword !== password) {
            return res.status(400).json({ error: "Password don't match!" });
        }
        const user = await User.findOne({ username });
        if (user) {
            res.status(400).json({ error: "User already exists!" });
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
            isAdmin: user.isAdmin
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
