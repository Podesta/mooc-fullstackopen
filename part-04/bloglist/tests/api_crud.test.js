const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./api_crud_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.listDefault.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());

  await Promise.all(promiseArray);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.listDefault.length);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('_id is named id', async () => {
  const blog = await Blog.findOne({});
  expect(blog.id).toBeDefined();
});

test('valid blog can be added', async () => {
  const blogToAdd = {
    title: 'will be removed soon',
    author: 'gone',
    likes: 10,
  };

  const added = await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.listDefault.length + 1);
  expect(response.body).toContainEqual(added.body);
  expect(added.body).toMatchObject(blogToAdd);
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});
