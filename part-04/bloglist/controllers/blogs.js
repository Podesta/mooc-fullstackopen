const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

blogRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body);

  const addedBlog = await blog.save();
  res.status(201).json(addedBlog);
});

blogRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = blogRouter;
