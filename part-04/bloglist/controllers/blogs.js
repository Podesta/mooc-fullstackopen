const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  res.json(blogs);
});

blogRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

blogRouter.post('/', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  };

  const user = await User.findById(decodedToken.id);

  const blog = new Blog(
    {
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user._id
    });

  const addedBlog = await blog.save();
  user.blogs = user.blogs.concat(addedBlog);
  await user.save();

  res.status(201).json(addedBlog);
});

blogRouter.delete('/:id', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  };

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(204).end();
  } else if (blog.user.toString() === decodedToken.id.toString()) {
    await blog.delete();
    res.status(204).end();
  } else {
    return res.status(401).json({ error: 'permission denied' });
  }
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
