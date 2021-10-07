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
    url: 'soontobegone.com',
    likes: 10,
  };

  const added = await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(helper.listDefault.length + 1);
  expect(blogsAtEnd.body).toContainEqual(added.body);
  expect(added.body).toMatchObject(blogToAdd);
}, 10000);

test('if likes is missing, it defaults to 0', async () => {
  const blogToAdd = {
    title: 'will be removed soon',
    author: 'gone',
    url: 'soontobegone.com'
  };

  const added = await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(helper.listDefault.length + 1);
  expect(added.body).toMatchObject({ likes: 0 });
});

test('blog without title is rejected', async () => {
  const blogToAdd = {
    author: 'gone',
    url: 'soontobegone.com'
  };

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(400);

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(helper.listDefault.length);
});

test('blog without url is rejected', async () => {
  const blogToAdd = {
    title: 'will be removed soon',
    author: 'gone',
  };

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(400);

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(helper.listDefault.length);
});

afterAll(() => {
  mongoose.connection.close();
});
