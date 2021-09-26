const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum += blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let likes = blogs[0].likes;
  return blogs.reduce((mostLiked, blog) => {
    if (likes > blog.likes) {
      return mostLiked;
    } else {
      mostLiked.title = blog.title;
      mostLiked.author = blog.author;
      mostLiked.likes = blog.likes;
      likes = mostLiked.likes;
      return mostLiked;
    }
  }, {});
};

const mostBlogs = (blogs) => {
  return (
    _.maxBy(
      _.map(
        _.countBy(blogs, 'author'), (val, key) => {
          return ({
            author: key,
            blogs: val
          });
        }), 'blogs'
    )
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
