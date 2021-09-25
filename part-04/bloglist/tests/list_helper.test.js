const listHelper = require('../utils/list_helper');

test('dummy return one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
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

  const listWithZeroBlogs = [];

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

});
