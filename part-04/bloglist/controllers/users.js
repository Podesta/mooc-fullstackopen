const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 });
  res.json(users);
});

userRouter.post('/', async (req, res, next) => {
  const body = req.body;
  const saltRounds = 10;

  if (!body.password) {
    return res.status(400).send({ error: 'password field required' });
  }
  if (body.password.length < 3) {
    return res.status(400).send({ error: 'password must be longer than 3 characters' });
  }

  const hashedPassword = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username.toLowerCase(),
    name: body.name,
    hashedPassword
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = userRouter;
