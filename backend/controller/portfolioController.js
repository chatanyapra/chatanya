import cloudinary from "cloudinary";
import fs from "fs";
import Project from "../models/projectModel.js";
import Blog from "../models/BlogModel.js";
import asyncHandler from "express-async-handler";

export const modifyBlog = asyncHandler(async (req, res) => {
    try {
        const { id: blogId } = req.params;
        const senderId = req.user._id;
        const { title, shortDescription, longDescription } = req.body;

        // Check if blog exists
        const existingBlog = await Blog.findById(blogId);
        if (!existingBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Only delete existing images if new files are being uploaded
        if (req.files && req.files.length > 0) {
            // Delete old images from Cloudinary
            if (existingBlog.images && existingBlog.images.length > 0) {
                await Promise.all(
                    existingBlog.images.map(async (image) => {
                        const publicId = image.url.split('/').pop().split('.')[0];
                        await cloudinary.uploader.destroy(`portfolio/${publicId}`);
                    })
                );
            }

            // Upload new images to Cloudinary
            const imageUploads = await Promise.all(
                req.files.map(async (file) => {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: "portfolio",
                    });
                    fs.unlinkSync(file.path); // Delete local file after uploading
                    return { url: result.secure_url, alt: file.originalname };
                })
            );

            // Set the new images to the blog
            existingBlog.images = imageUploads;
        }

        // Update the blog document fields
        existingBlog.userId= senderId,
        existingBlog.title = title;
        existingBlog.shortDescription = shortDescription;
        existingBlog.longDescription = longDescription;

        // Save the updated blog
        await existingBlog.save();

        res.status(200).json({ message: "Blog updated successfully", data: existingBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading blog", error });
    }
});

export const getBlogById = asyncHandler(async (req, res) => {
    try {
        const { id: blogId } = req.params;

        // Find a single blog by ID where isDeleted is false
        // const blog = await Blog.findOne({ _id: blogId, isDeleted: false });
        const blog = await Blog.findOne({ _id: blogId });

        // Check if the blog was found
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found or has been deleted" });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
});

export const getBlogs = asyncHandler(async (req, res) => {
    try {
        // const blogs = await Blog.find({ isDeleted: false })
        const blogs = await Blog.find()
            .select('-longDescription') // Exclude the longDescription field
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
});


export const getProjectById = asyncHandler(async (req, res) => {
    try {
        const { id: projectId } = req.params;

        // Find a single blog by ID where isDeleted is false
        // const project = await Project.findOne({ _id: projectId, isDeleted: false });
        const project = await Project.findOne({ _id: projectId });

        // Check if the blog was found
        if (!project) {
            return res.status(404).json({ success: false, message: "Blog not found or has been deleted" });
        }

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
});

export const getProjects= asyncHandler(async (req, res) => {
    try {
        // const project = await Project.find({ isDeleted: false })
        const project = await Project.find()
            .select('-longDescription') // Exclude the longDescription field
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
});
export const modifyProject = asyncHandler(async (req, res) => {
    try {
        const { id: projectId } = req.params;
        const senderId = req.user._id;
        const { title, shortDescription, longDescription, techStack, link } = req.body;

        const existingProject = await Project.findById(projectId);
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Only delete existing images if new files are being uploaded
        if (req.files && req.files.length > 0) {
            // Delete old images from Cloudinary
            if (existingProject.images && existingProject.images.length > 0) {
                await Promise.all(
                    existingProject.images.map(async (image) => {
                        const publicId = image.url.split('/').pop().split('.')[0];
                        await cloudinary.uploader.destroy(`portfolio/${publicId}`);
                    })
                );
            }

            // Upload new images
            const imageUploads = await Promise.all(
                req.files.map(async (file) => {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: "portfolio",
                    });
                    fs.unlinkSync(file.path);
                    return { url: result.secure_url, alt: file.originalname };
                })
            );

            // Set the new images to the project
            existingProject.images = imageUploads;
        }

        // Check if techStack is a string (from the request) and parse it if necessary
        const parsedTechStack = typeof techStack === 'string' ? JSON.parse(techStack) : techStack;

        // Map techStack entries to ensure they are objects with `name` fields
        const techStackEntries = parsedTechStack.map(entry =>
            typeof entry === 'string' ? { name: entry } : entry
        );

        // Update the existing project document
        existingProject.userId= senderId,
        existingProject.title = title;
        existingProject.title = title;
        existingProject.shortDescription = shortDescription;
        existingProject.longDescription = longDescription;
        existingProject.techStack = techStackEntries;
        existingProject.link = link;

        // Save the updated project
        await existingProject.save();
        res.status(201).json({ message: 'Project updated successfully', data: existingProject });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading project', error });
    }
});


// Upload new project
export const uploadProject = asyncHandler(async (req, res) => {
    try {
        const { title, shortDescription, longDescription, techStack, link } = req.body;
        const senderId = req.user._id;

        // Validation for required fields
        if (!title || !shortDescription || !longDescription || !techStack || !link) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for files to upload
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Upload images to Cloudinary
        const imageUploads = await Promise.all(
            req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "portfolio",
                });
                fs.unlinkSync(file.path); // Delete local file after uploading
                return { url: result.secure_url, alt: file.originalname };
            })
        );

        // Parse tech stack if it’s a JSON string
        const parsedTechStack = typeof techStack === 'string' ? JSON.parse(techStack) : techStack;
        const techStackEntries = parsedTechStack.map(entry =>
            typeof entry === 'string' ? { name: entry } : entry
        );

        // Create and save the project
        const newProject = new Project({
            userId: senderId,
            title,
            shortDescription,
            longDescription,
            images: imageUploads,
            techStack: techStackEntries,
            link,
        });
        await newProject.save();

        res.status(201).json({ message: "Project uploaded successfully", data: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading project", error });
    }
});

// Upload new blog
export const uploadBlog = asyncHandler(async (req, res) => {
    try {
        const { title, shortDescription, longDescription } = req.body;
        const senderId = req.user._id; // Assuming `req.user` contains the authenticated user

        // Validation for required fields
        if (!title || !shortDescription || !longDescription) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for files to upload
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Upload images to Cloudinary
        const imageUploads = await Promise.all(
            req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "portfolio",
                });
                fs.unlinkSync(file.path); // Delete local file after uploading
                return { url: result.secure_url, alt: file.originalname };
            })
        );

        // Create and save the blog
        const newBlog = new Blog({
            userId: senderId,
            title,
            shortDescription,
            longDescription,
            images: imageUploads,
        });
        await newBlog.save();

        res.status(201).json({ message: "Blog uploaded successfully", data: newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading blog", error });
    }
});