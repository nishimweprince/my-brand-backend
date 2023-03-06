import Blog from "../models/blog.js";
import errorFunc from "../utils/errors.js";
import checkDuplication from "../utils/duplication.js";

class blogController {
  // GET ALL BLOGS
  static async getBlogs(req, res) {
    // Retrieve all blogs from the database
    try {
      const blogs = await Blog.find();
      res.status(200).json({
        data: blogs,
      });

      // Catch any errors
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // CREATE BLOG
  static async createBlog(req, res) {
    // Catch blog attributes from the request body
    try {
      const {
        title,
        body,
        author_name,
        author_twitter,
        author_linkedin,
        author_github,
        image,
      } = req.body;

      // Check if the blog already exists
      const blogExists = await checkDuplication(Blog, { body });

      if (blogExists) {
        return res.status(409).json({
          message: "Blog already exists",
        });
      }

      else {
        // Create a new blog
      const blog = await Blog.create({
        title,
        body,
        author_name,
        author_twitter,
        author_linkedin,
        author_github,
        image,
        createdAt: Date.now(),
      });
      }

      // Send a response
      res.status(201).json({
        message: "Blog created successfully",
        data: blog.title,
      });

      // Catch any errors
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // GET SINGLE BLOG
  static async getSingleBlog(req, res) {
    try {
      // Catch blog id from the request params
      const { id } = req.params;

      // Find the blog with the id
      const blog = await Blog.findById({ _id: id });

      // Send a response
      res.status(200).json({
        data: blog,
      });

      // Catch any errors
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // UPDATE BLOG
  static async updateBlog(req, res) {
    try {
      // Catch blog id from the request params
      const { id } = req.params;

      // Catch blog attributes from the request body
      const { title, body } = req.body;

      // Find the blog with the id and update it with blog attributes from the request body
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, body },
        { new: true }
      );

      // Check existence of the blog and send a response
      if (!updatedBlog) {
        return res.status(404).json({
          message: "The blog you are trying to update does not exist",
        });
      } else {
        return res.status(200).json({
          message: "Blog updated successfully",
        });
      }
    } catch (error) {
      // Catch any errors
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // DELETE BLOG
  static async deleteBlog(req, res) {
    try {
      // Catch blog id from the request params
      const { id } = req.params;

      // Find the blog with the id and delete it
      const deletedBlog = await Blog.findByIdAndDelete(id);

      // Check existence of the blog and send a response
      if (!deletedBlog) {
        return res.status(404).json({
          message: "The blog you are trying to delete does not exist",
        });
      } else {
        return res.status(200).json({
          message: "Blog deleted successfully",
        });
      }
    } catch (error) {
      // Catch any errors
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // COMMENT ON BLOG
  static async commentOnBlog(req, res) {

    try {
      // Catch blog id from the request params
      const { id } = req.params;

      // Catch comment attributes from the request body
      const { name, comment } = req.body;
      const createdAt = Date.now();

      // Find the blog with the id and push the comment attributes to the comments array
      const blog = await Blog.findById(id);
      blog.comments.push({ name, comment, createdAt });

      // Save the blog
      await blog.save();

      // Send a response
      res.status(201).json({
        message: "Comment added successfully",
      });

      // Catch any errors
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }

  }

  // LIKE BLOG
  static async likeBlog(req, res) {
    try {
      // Catch blog id from the request params
      const { id } = req.params;

      // Find the blog with the id and increment the likes by 1
      const blog = await Blog.findById(id);
      blog.likes += 1;

      // Save the blog
      await blog.save();

      // Send a response
      res.status(201).json({
        message: "Blog liked successfully",
      });

      // Catch any errors
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

}

export default blogController;