const _ = require("lodash");
const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.lenght === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  let favorite = blogs[0];
  const blo = () =>
    blogs.forEach(blog => {
      if (favorite.likes < blog.likes) {
        favorite = blog;
      }
    });
  blo();
  return favorite;
};

const mostBlogs = blogs => {
  const count = {
    author: "",
    blogs: 0
  };
  const most = () =>
    blogs.forEach(blog => {
      let blogCount = _.filter(blogs, ["author", blog.author]).length;
      if (blogCount > count.blogs) {
        count.author = blog.author;
        count.blogs = blogCount;
      }
    });
  most();
  return count;
};

const mostLikes = blogs => {
  const auth = {
    author: "",
    likes: 0
  };

  const like = () => {
    blogs.forEach(blog => {
      const ok = totalLikes(_.filter(blogs, ["author", blog.author]));
      if (ok > auth.likes) {
        auth.author = blog.author;
        auth.likes = ok;
      }
    });
  };
  like();
  return auth;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
