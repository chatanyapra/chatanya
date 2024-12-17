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
            const ipResponse = await axios.get("https://api.ipify.org?format=json");
            const userIP = ipResponse.data.ip;
    
            await axios.post("/api/users/uservisit", {
              userId,
              ip: userIP,
            });
          } catch (error) {
            console.error("Error tracking visit:", error.message);
          }
        };
    
        trackUserVisit();
      }, []);
}

export default useUserVisit
