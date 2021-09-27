const listHelper = require('../utils/list_helper');

test('dummy return one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});


describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has multiple blogs, sum correctly', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs);
    expect(result).toBe(167);
  });

  test('when list has zero blogs, likes is zero', () => {
    const result = listHelper.totalLikes(listWithZeroBlogs);
    expect(result).toBe(0);
  });

  test('with default list', () => {
    const result = listHelper.totalLikes(listDefault);
    expect(result).toBe(36);
  });

});


describe('Favorite blog', () => {

  test('when list has multiple blogs', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs);
    expect(result).toEqual({
      title: 'My first blog post',
      author: 'Me',
      likes: 150
    });
  });

  test('when list has a single blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('when list has no blog', () => {
    const result = listHelper.favoriteBlog(listWithZeroBlogs);
    expect(result).toEqual(null);
  });

  test('when list has blogs with same likes', () => {
    const result = listHelper.favoriteBlog(listWithRepeatingLikes);
    expect(result).toEqual({
      title: 'Another blog with a ton of likes',
      author: 'Me',
      likes: 150
    });
  });

  test('with default list', () => {
    const result = listHelper.favoriteBlog(listDefault);
    expect(result).toEqual({
      'title': 'Canonical string reduction',
      'author': 'Edsger W. Dijkstra',
      'likes': 12,
    });
  });

});


describe('Most blogs', () => {

  test('when list has three blogs', () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    });
  });

  test('when two authors have the same amount, return the first match', () => {
    const result = listHelper.mostBlogs(listWithRepeatingLikes);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    });
  });

  test('when list has a single author, return him', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    });
  });

  test('when list has no blogs', () => {
    const result = listHelper.mostBlogs(listWithZeroBlogs);
    expect(result).toEqual(undefined);
  });

  test('with default list', () => {
    const result = listHelper.mostBlogs(listDefault);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });

});


describe('Most likes', () => {

  test('when list has three blogs', () => {
    const result = listHelper.mostLikes(listWithThreeBlogs);
    expect(result).toEqual({
      author: 'Me',
      likes: 150
    });
  });

  test('with repeating list', () => {
    const result = listHelper.mostLikes(listWithRepeatingLikes);
    expect(result).toEqual({
      author: 'Me',
      likes: 300
    });
  });

  test('when list has a single author, return him', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('when list has no blogs', () => {
    const result = listHelper.mostLikes(listWithZeroBlogs);
    expect(result).toEqual(undefined);
  });

  test('with default list', () => {
    const result = listHelper.mostLikes(listDefault);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });

});


const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

const listWithThreeBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '614d3f4d370f8cd1592a980c',
    title: 'My first blog post',
    author: 'Me',
    url: 'https://www.example.com/afternoon.php?blow=bit#bottle',
    likes: 150,
    __v: 0
  },
  {
    _id: '614f6e22dfcc60c524740295',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'https://www.example.com/books/box#baseball',
    likes: 12,
    __v: 0
  }
];

const listWithRepeatingLikes = listWithThreeBlogs.concat({
  title: 'Another blog with a ton of likes',
  author: 'Me',
  likes: 150
});

const listWithZeroBlogs = [];

const listDefault = [
  {
    '_id': '5a422a851b54a676234d17f7',
    'title': 'React patterns',
    'author': 'Michael Chan',
    'url': 'https://reactpatterns.com/',
    'likes': 7,
    '__v': 0
  },
  {
    '_id': '5a422aa71b54a676234d17f8',
    'title': 'Go To Statement Considered Harmful',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    'likes': 5,
    '__v': 0
  },
  {
    '_id': '5a422b3a1b54a676234d17f9',
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    'likes': 12,
    '__v': 0
  },
  {
    '_id': '5a422b891b54a676234d17fa',
    'title': 'First class tests',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    'likes': 10,
    '__v': 0
  },
  {
    '_id': '5a422ba71b54a676234d17fb',
    'title': 'TDD harms architecture',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    'likes': 0,
    '__v': 0
  },
  {
    '_id': '5a422bc61b54a676234d17fc',
    'title': 'Type wars',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    'likes': 2,
    '__v': 0
  }
];