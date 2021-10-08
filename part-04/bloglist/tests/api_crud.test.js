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


describe('when there are blogs already saved', () => {
  test('all blogs are returned', async () => {
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
});


describe('addition of a new Blog', () => {
  test('succeeds with status 201 when all fields are filled', async () => {
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

  test('succeeds and default likes to 0, when likes field is missing', async () => {
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

  test('fails when title is missing', async () => {
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

  test('fails when url is missing', async () => {
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
});


describe('deletion of a Blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    let blogsAtStart = await Blog.find({});
    blogsAtStart = blogsAtStart.map(blog => blog.toJSON());
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(helper.listDefault.length - 1);
    expect(blogsAtEnd.body).not.toContainEqual(blogToDelete);
  });

  test('return 204 if id is valid but blog does not exist', async () => {
    const id = await helper.nonexistingId();

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(helper.listDefault.length);
  });

  test('fails with status 400 if id is invalid', async () => {
    const invalidId = '12345';

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400);
  });
});


describe('updating a Blog', () => {
  test('succeeds with 200 with valid and existing id', async () => {
    let blogsAtStart = await Blog.find({});
    blogsAtStart = blogsAtStart.map(blog => blog.toJSON());
    const blogToChange = blogsAtStart[0];

    const newBlog = {
      title: 'A new Blog',
      author: 'soon gone',
      url: 'changes.com',
      likes: 100,
    };

    const updatedBlog = await api
      .put(`/api/blogs/${blogToChange.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(helper.listDefault.length);
    expect(blogsAtEnd.body).not.toContainEqual(blogToChange);
    expect(blogsAtEnd.body).toContainEqual(updatedBlog.body);
    expect(updatedBlog.body).toMatchObject(newBlog);
  });

  test('succeeds with 200 and changes nothing when req is empty', async () => {
    let blogsAtStart = await Blog.find({});
    blogsAtStart = blogsAtStart.map(blog => blog.toJSON());
    const blogToChange = blogsAtStart[0];

    const newBlog = {};

    const updatedBlog = await api
      .put(`/api/blogs/${blogToChange.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(helper.listDefault.length);
    expect(blogsAtEnd.body).toContainEqual(blogToChange);
    expect(blogsAtEnd.body).toContainEqual(updatedBlog.body);
    expect(blogsAtStart).toStrictEqual(blogsAtEnd.body);
  });

  test('fails with 409 if id is valid but Blog does not exist', async () => {
    const id = await helper.nonexistingId();

    await api
      .put(`/api/blogs/${id}`)
      .expect(409);
  });

  test('fails with 400 if id is invalid', async () => {
    const invalidId = '12345';

    await api
      .put(`/api/blogs/${invalidId}`)
      .expect(400);
  });
});


afterAll(() => {
  mongoose.connection.close();
});
