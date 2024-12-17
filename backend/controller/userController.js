import asyncHandler from "express-async-handler";
import UserVisit from "../models/UserVisit.js";
import axios from "axios";

export const getUserForSidebar = asyncHandler(async (req, res) => {
  try {
    const { userId, ip, latitude, longitude } = req.body;

    if (!userId || !ip) {
      return res.status(400).json({ error: "userId and ip are required" });
    }

    let city = "";
    let region = "";
    let country = "";
    let ipType = "imaginary"; // Default to "imaginary"
    let loc = latitude && longitude ? `${latitude},${longitude}` : "";

    if (latitude && longitude) {
      try {
        const geoResponse = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const { address } = geoResponse.data;

        if (address) {
          city = address.city || address.town || "";
          region = address.state || "";
          country = address.country || "";
          ipType = "real"; 
        }
      } catch (geoError) {
        console.warn("Reverse geocoding failed, falling back to IP-based location.");
      }
    }

    if (!latitude || !longitude || !city) {
      try {
        const ipResponse = await axios.get(
          `https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`
        );
        const ipData = ipResponse.data;

        city = ipData.city || "";
        region = ipData.region || "";
        country = ipData.country || "";
        loc = ipData.loc || "";
        ipType = "imaginary"; 
      } catch (ipError) {
        console.error("IP-based location fetch failed:", ipError.message);
      }
    }

    let userVisit = await UserVisit.findOne({ userId });

    if (userVisit) {
      userVisit.visitedAt = new Date();

      if (userVisit.location !== loc) {
        userVisit.city = city;
        userVisit.region = region;
        userVisit.country = country;
        userVisit.location = loc;
        userVisit.ipType = ipType;
      }

      await userVisit.save();
      return res.json({ message: "User visit updated", data: userVisit });
    } else {
      const newVisit = new UserVisit({
        userId,
        ip,
        city,
        region,
        country,
        latitude: latitude || null,
        longitude: longitude || null,
        visitedAt: new Date(),
        ipType,
      });

      await newVisit.save();
      return res.json({ message: "New visitor added", data: newVisit });
    }
  } catch (error) {
    console.error("Error tracking visit:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});
