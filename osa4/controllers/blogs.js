const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    name: 1,
    username: 1,
    id: 1
  });
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
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });

    response.json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {

  
  try {
    let decodedToken ='';
    let userid =''
    if(request.token){
    decodedToken = jwt.verify(request.token, process.env.SECRET);
    userid = decodedToken.id
    }
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== userid.toString()) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    


    await Blog.findByIdAndRemove(request.params.id);
    response.sendStatus(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  //const token = getTokenFrom(request)
  console.log(request.token)
  try {
    let decodedToken=''
    if(request.token){
     decodedToken = jwt.verify(request.token, process.env.SECRET);
    }
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(body.userId);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    });
    if (blog.title === undefined && blog.url === undefined) {
      response.sendStatus(400);
    }

    const savedBlog = await blog.save();
    user.blog = user.blog.concat(savedBlog.id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
