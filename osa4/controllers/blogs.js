const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };
  try {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true});
   
    response.json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.sendStatus(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  });
  if (blog.title === undefined && blog.url === undefined) {
    response.sendStatus(400);
  }

  try {
    const savedBlog = await blog.save();
    response.json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;