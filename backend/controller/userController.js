import asyncHandler from "express-async-handler";
import UserVisit from "../models/UserVisit.js";
import axios from "axios";

// Track User Visit and Location (IP-based)
export const getUserForSidebar = asyncHandler(async (req, res) => {
  try {
    const { userId, ip } = req.body;
    
    if (!userId || !ip) {
      return res.status(400).json({ error: "userId and ip are required" });
    }
    
    // Fetch location data using ipinfo.io
    const response = await axios.get(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`);
    const { city, region, country, loc } = response.data;

    // Check if the user already exists in the database
    let userVisit = await UserVisit.findOne({ userId });
    
    if (userVisit) {
      // Update the existing user's visit time and location (if needed)
      userVisit.visitedAt = new Date();
      
      // Optionally, update location if it's different
      if (userVisit.location !== loc) {
        userVisit.city = city;
        userVisit.region = region;
        userVisit.country = country;
        userVisit.location = loc;
      }
      
      await userVisit.save();
      return res.json({ message: "User visit updated", data: userVisit });
    } else {
      // Create a new user visit entry
      const newVisit = new UserVisit({
        userId,
        ip,
        city,
        region,
        country,
        location: loc,
        visitedAt: new Date(),
      });
      
      await newVisit.save();
      return res.json({ message: "New visitor added", data: newVisit });
    }
  } catch (error) {
    console.error("Error tracking visit:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});
