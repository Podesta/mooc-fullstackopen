const listHelper = require('../utils/list_helper');
const testHelp = require('./list_helper');

test('dummy return one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});


describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelp.listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has multiple blogs, sum correctly', () => {
    const result = listHelper.totalLikes(testHelp.listWithThreeBlogs);
    expect(result).toBe(167);
  });

  test('when list has zero blogs, likes is zero', () => {
    const result = listHelper.totalLikes(testHelp.listWithZeroBlogs);
    expect(result).toBe(0);
  });

  test('with default list', () => {
    const result = listHelper.totalLikes(testHelp.listDefault);
    expect(result).toBe(36);
  });

});


describe('Favorite blog', () => {

  test('when list has multiple blogs', () => {
    const result = listHelper.favoriteBlog(testHelp.listWithThreeBlogs);
    expect(result).toEqual({
      title: 'My first blog post',
      author: 'Me',
      likes: 150
    });
  });

  test('when list has a single blog', () => {
    const result = listHelper.favoriteBlog(testHelp.listWithOneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('when list has no blog', () => {
    const result = listHelper.favoriteBlog(testHelp.listWithZeroBlogs);
    expect(result).toEqual(null);
  });

  test('when list has blogs with same likes', () => {
    const result = listHelper.favoriteBlog(testHelp.listWithRepeatingLikes);
    expect(result).toEqual({
      title: 'Another blog with a ton of likes',
      author: 'Me',
      likes: 150
    });
  });

  test('with default list', () => {
    const result = listHelper.favoriteBlog(testHelp.listDefault);
    expect(result).toEqual({
      'title': 'Canonical string reduction',
      'author': 'Edsger W. Dijkstra',
      'likes': 12,
    });
  });

});


describe('Most blogs', () => {

  test('when list has three blogs', () => {
    const result = listHelper.mostBlogs(testHelp.listWithThreeBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    });
  });

  test('when two authors have the same amount, return the first match', () => {
    const result = listHelper.mostBlogs(testHelp.listWithRepeatingLikes);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    });
  });

  test('when list has a single author, return him', () => {
    const result = listHelper.mostBlogs(testHelp.listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    });
  });

  test('when list has no blogs', () => {
    const result = listHelper.mostBlogs(testHelp.listWithZeroBlogs);
    expect(result).toEqual(undefined);
  });

  test('with default list', () => {
    const result = listHelper.mostBlogs(testHelp.listDefault);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });

});


describe('Most likes', () => {

  test('when list has three blogs', () => {
    const result = listHelper.mostLikes(testHelp.listWithThreeBlogs);
    expect(result).toEqual({
      author: 'Me',
      likes: 150
    });
  });

  test('with repeating list', () => {
    const result = listHelper.mostLikes(testHelp.listWithRepeatingLikes);
    expect(result).toEqual({
      author: 'Me',
      likes: 300
    });
  });

  test('when list has a single author, return him', () => {
    const result = listHelper.mostLikes(testHelp.listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('when list has no blogs', () => {
    const result = listHelper.mostLikes(testHelp.listWithZeroBlogs);
    expect(result).toEqual(undefined);
  });

  test('with default list', () => {
    const result = listHelper.mostLikes(testHelp.listDefault);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });

});

