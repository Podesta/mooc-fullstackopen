const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.get('/:id', (req, res, next) => {
  Blog
    .findById(req.params.id).then(blog => {
      res.json(blog);
    })
    .catch(error => next(error));
});

blogRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body);

  const addedBlog = await blog.save();
  res.status(201).json(addedBlog);
});

module.exports = blogRouter;
