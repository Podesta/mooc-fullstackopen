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

blogRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const blog = {};

  if (body.title) {
    blog.title = body.title;
  }
  if (body.author) {
    blog.author = body.author;
  }
  if (body.url) {
    blog.url = body.url;
  }
  if (body.likes) {
    blog.likes = body.likes;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  if (!updatedBlog) {
    res.status(409).json({ error: 'id not found' });
  } else {
    res.json(updatedBlog);
  }
});

module.exports = blogRouter;
