import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa6";

const CommentSection = () => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            console.log("Comment is empty or whitespace only."); // Debug log
            return;
        }

        console.log("Comment to be submitted:", comment); 
        setComments([{ comment, userName: "Logged-in User" }, ...comments]);
        setComment("");
    };

    return (
        <div
            className="z-10 h-fit min-h-screen  mb-20 w-full relative dark:text-gray-700 text-white  flex flex-col items-center m-auto pt-32 max-md:pt-12"
            style={{ maxWidth: "1600px" }}
        >
            <form
                onSubmit={handleSubmit}
                className="sm:w-[90%] w-[98%] mx-auto mt-10 sm:p-6 p-4 transparent-color light-dark-shadow sm:rounded-[50px] rounded-3xl"
            >
                <div className="flex justify-between mt-4">
                    <h2 className="text-2xl font-bold mb-4">Share Your Opinion</h2>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 px-6 text-2xl rounded-3xl shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <FaRegPaperPlane />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="comment"
                            className="block text-sm font-medium"
                        >
                            Your Comment
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            rows="2"
                            placeholder="Write your comment here..."
                            className="mt-1 block w-full p-3 rounded-2xl border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">Comments</h3>
                    <div className="space-y-4 sm:pl-6 mt-10 mb-6">
                        {comments.map((c, index) => (
                            <div key={index} className="relative border-2 border-gray-400 sm:p-4 px-3 py-2 rounded-r-[50px] rounded-bl-[50px] max-sm:rounded-tl-[4px] shadow-md mb-10">
                                <div className="sm:absolute relative sm:-top-8 -left-6 sm:border-2 max-sm:ml-3 sm:dark:bg-white sm:bg-black border-gray-400  w-fit min-w-96 min-h-14 rounded-[40px] flex p-2 items-center">
                                    <img src="//picsum.photos/1920/1080" className="w-12 h-12 rounded-full" alt="" />
                                    <div className="px-4 w-full overflow-hidden">
                                        <h4 className="text-base font-semibold">{c.userName}</h4>
                                        <p className="text-[12px]">Chatanya pratap</p>
                                    </div>
                                </div>
                                <div className="sm:mt-8 -mt-2 pl-5 overflow-hidden">
                                    <div className="w-[95%] h-[2px] rounded-[100%] bg-white dark:bg-gray-400 mt-2 max-sm:block hidden"></div>
                                    <p className="text-white dark:text-black mt-1 max-sm:text-gray-200 text-wrap ">{c.comment}</p>
                                    <span className="text-xs text-gray-300 dark:text-gray-600 float-end px-5 py-2">
                                        Just now
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CommentSection;
