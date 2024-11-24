import { useState } from "react";
import toast from "react-hot-toast";

const useGetProjectComments = () => {
  const [loadingComments, setLoadingComments] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchProjectComments = async (projectId) => {
    if (!projectId) {
      toast.error("Project ID is required to fetch comments.");
      return;
    }

    setLoadingComments(true);
    try {
      const response = await fetch(`/api/portfolio/projectcomments/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        setComments(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch comments.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("An error occurred while fetching comments.");
    } finally {
      setLoadingComments(false);
    }
  };

  return { loadingComments, comments, setComments, fetchProjectComments };
};

export default useGetProjectComments;
