import { useState } from "react";
import toast from "react-hot-toast";

const useGetBlogComments = () => {
  const [loadingComments, setLoadingComments] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchBlogComments = async (blogId) => {
    if (!blogId) {
      toast.error("Blog ID is required to fetch comments.");
      return;
    }

    setLoadingComments(true);
    try {
      const response = await fetch(`/api/portfolio/blogcomments/${blogId}`, {
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

  return { loadingComments, comments, fetchBlogComments };
};

export default useGetBlogComments;
