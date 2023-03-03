import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

    title: { type: String, required: true },
    body : { type: String, required: true },
    author_name: { type: String, required: true },
    author_twitter: { type: String, required: true },
    author_linkedin: { type: String, required: true },
    author_github: { type: String, required: true },
    image: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now() }

});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;