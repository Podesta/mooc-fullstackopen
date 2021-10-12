const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

logger.info('connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongoDB');
  })
  .catch(error => {
    logger.error('error connecting to mongoDB:', error.message);
  });


app.use(cors());
app.use(express.json());
app.use(morgan('tiny', {
  skip: () => process.env.NODE_ENV === 'test' }));

app.use('/api/login', loginRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
