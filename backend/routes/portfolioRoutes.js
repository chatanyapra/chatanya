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
} from "../controller/portfolioController.js";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/fileUpload.js"; // Middleware for file uploads

const router = express.Router();

// Blog Routes
router.get("/blogs/:id", protectRoute, getBlogById);                // Get a single blog by ID
router.get("/blogs", protectRoute, getBlogs);                       // Get all blogs
router.put("/blogs/:id", protectRoute, upload.array('files'), modifyBlog); // Modify an existing blog
router.post("/blogs", protectRoute, upload.array('files'), uploadBlog);    // Upload a new blog

// Project Routes
router.get("/projects/:id", protectRoute, getProjectById);          // Get a single project by ID
router.get("/projects", protectRoute, getProjects);                 // Get all projects
router.put("/projects/:id", protectRoute, upload.array('files'), modifyProject); // Modify an existing project
router.post("/projects", protectRoute, upload.array('files'), uploadProject);    // Upload a new project

export default router;
