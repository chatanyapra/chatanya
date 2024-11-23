import { useState } from 'react';
import toast from 'react-hot-toast';

const useAddBlogComment = () => {
    function handleInputError(commentText) {
        if (!commentText || commentText === "") {
            toast.error('Please fill in all fields');
            return false;
        }
        return true;
    }

    const [loadingBlog, setLoadingBlog] = useState(false);

    const addBlogComment = async ({blogId, commentText}) => {
        const success = handleInputError(commentText);
        if (!success) return;

        setLoadingBlog(true);
        try {
            const response = await fetch(`/api/portfolio/blogcomment/${blogId}`, {
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
            setLoadingBlog(false);
        }
    }
    return { loadingBlog, addBlogComment };
}

export default useAddBlogComment
