// routes/portfolioRoutes.js
import express from "express";
import {
    modifyBlog,
    getBlogById,
    getBlogs,
    modifyProject,
    getProjectById,
    getProjects,
    uploadProject,
    uploadBlog,
    getBlogComment,
    addBlogComment,
    addProjectComment,
    getProjectComment,
    deleteBlogComment,
    deleteProjectComment,
} from "../controller/portfolioController.js";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/fileUpload.js"; 

const router = express.Router();

// Blog Routes
router.get("/blogs/:id", getBlogById);  
router.get("/blogs", getBlogs); 
router.put("/blogs/:id", protectRoute, upload.array('files'), modifyBlog); 
router.post("/blogs", protectRoute, upload.array('files'), uploadBlog); 

// Blog comments
router.get("/blogcomments/:id", getBlogComment); 
router.post("/blogcomment/:id", protectRoute, addBlogComment); 
router.put("/blogcomment/:id", protectRoute, deleteBlogComment); 

// Project comments
router.get("/projectcomments/:id", getProjectComment);
router.post("/projectcomment/:id", protectRoute, addProjectComment); 
router.put("/projectcomment/:id", protectRoute, deleteProjectComment); 

// Project Routes
router.get("/projects/:id", getProjectById); 
router.get("/projects", getProjects); 
router.put("/projects/:id", protectRoute, upload.array('files'), modifyProject); 
router.post("/projects", protectRoute, upload.array('files'), uploadProject); 

export default router;
