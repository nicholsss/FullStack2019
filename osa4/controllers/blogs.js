const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})  
    .populate('user', { username: 1, name: 1 }).populate('comments', {text:1})

  response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
    
  const user = await User.findById(decodedToken.id)
  console.log('blog user', user)
  blog.user = user
  console.log('useri tiedot', blog.user)
  
  if (!blog.url || !blog.title ) {
    return response.status(400).send({ error: 'title or url missing'}).end()
  }

  if ( !blog.likes ) {
    blog.likes = 0
  }

  const result = await blog.save()
  user.blogs = user.blogs.concat(blog)
  await user.save()

  response.status(201).json(result)
})
blogsRouter.post('/:id/comments', async(request,response) => {
  console.log('id', request.params.id)
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(400).json({ error: 'blog missing' })
  }
  const comment = new Comment(request.body)
  console.log('our comment', comment)
  console.log('comment inside', comment._id)
  
  

  comment.blog = blog._id
  console.log('comment.blog', comment)
  const result = await comment.save()
    console.log('resultti', result)
    console.log('blog comments', blog.comments)
    
    
    
  blog.comments = blog.comments.concat(result)
  await blog.save()
  response.status(201).json(result.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
  const { author, title, url,likes } = request.body

  const blog = {
    author, title, url, likes,
  }
  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 }).populate('comments', {text:1})
    
    
  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter