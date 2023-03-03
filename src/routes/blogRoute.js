import express from "express";
import blogController from "../controllers/blogController.js";

const router = express.Router();

// GET ALL BLOGS
router.get("/", blogController.getBlogs);

// CREATE BLOG
router.post("/", blogController.createBlog);

// GET SINGLE BLOG
router.get("/:id", blogController.getSingleBlog);

// UPDATE BLOG
router.put("/:id", blogController.updateBlog);

// DELETE BLOG
router.delete("/:id", blogController.deleteBlog);

export default router;