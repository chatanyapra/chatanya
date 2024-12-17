import mongoose from "mongoose";

const userVisitSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Unique identifier
    ip: String,
    city: String,
    region: String,
    country: String,
    location: String, // Latitude and Longitude
    visitedAt: { type: Date, default: Date.now }, 
});

const User = mongoose.model("UserVisit", userVisitSchema);
export default User;
