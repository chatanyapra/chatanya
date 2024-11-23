import { useState } from "react";
import toast from "react-hot-toast";

const useAddProjectComment = () => {
  function handleInputError(commentText) {
    if (!commentText || commentText === "") {
      toast.error("Please fill in all fields.");
      return false;
    }
    return true;
  }

  const [loadingProject, setLoadingProject] = useState(false);

  const addProjectComment = async ({projectId, commentText}) => {
    const isValid = handleInputError(commentText);
    if (!isValid) return;

    setLoadingProject(true);
    try {
      const response = await fetch(`/api/portfolio/projectcomment/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentText }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Comment added successfully!");
      } else {
        console.error(data.message || "Failed to add comment.");
        toast.error("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
        setLoadingProject(false);
    }
  };

  return { loadingProject, addProjectComment };
};

export default useAddProjectComment;
