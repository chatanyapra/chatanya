import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectMongoose from "./dbConnection/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

const app = express();
const port = 5001;
const __dirname = path.resolve();
dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/portfolio/", portfolioRoutes); 

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

app.listen(port, () => {
    connectMongoose();
    console.log(`Server running on port ${port}`);
})