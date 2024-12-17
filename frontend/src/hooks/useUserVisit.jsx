import { useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const useUserVisit = () => {
  useEffect(() => {
    const trackUserVisit = async () => {
      try {
        let userId = localStorage.getItem("userVisitId");

        if (!userId) {
          userId = uuidv4();
          localStorage.setItem("userVisitId", userId);
        }

        // Fetch the user's IP address
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        const userIP = ipResponse.data.ip;

        // Get user's latitude and longitude using Geolocation API
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Send user data, IP, latitude, and longitude to the backend
              await axios.post("/api/users/uservisit", {
                userId,
                ip: userIP,
                latitude,
                longitude,
              });
            },
            (error) => {
              console.error("Error", error.message);
              // Optionally send IP without geolocation if user denies access
              axios.post("/api/users/uservisit", {
                userId,
                ip: userIP,
                latitude: null,
                longitude: null,
              });
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
          await axios.post("/api/users/uservisit", {
            userId,
            ip: userIP,
            latitude: null,
            longitude: null,
          });
        }
      } catch (error) {
        console.error("Error tracking visit:", error.message);
      }
    };

    trackUserVisit();
  }, []);
};

export default useUserVisit;
