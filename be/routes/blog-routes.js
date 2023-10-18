import express from 'express'; 
import { getAllBlogs, postBlog, getBlog, updateBlog, deleteBlog } from '../controllers/blog-controllers.js'; 

// Create an Express Router for Blog routes
const blogsRouter = express.Router(); 

blogsRouter.get('/blogs', getAllBlogs); //done for homepage viewing all the blog
blogsRouter.post('/blogs/new', postBlog); // done for posting
blogsRouter.get('/blogs/:id', getBlog); // make a search bar ig 
blogsRouter.put('/blogs/:id', updateBlog); // for a button
blogsRouter.delete('/blogs/:id', deleteBlog); // for a button

export default blogsRouter; 