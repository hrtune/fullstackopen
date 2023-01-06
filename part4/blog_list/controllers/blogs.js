const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) {
    return response.status(401).json({
      error: "token missing or invalid"
    })
  }

  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog) 
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 })
  response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (!blog) {
    return response.status(204).end()
  }

  const user = request.user

  if (user._id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Blog.findByIdAndDelete(blogId)

  // delete the blog from the user object
  user.blogs = user.blogs.filter(b => b.toString() !== blogId)
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const oldBlog = await Blog.findById(blogId)

  if (!oldBlog) {
    return response.status(404).json({
      error: 'blog is not found'
    })
  }
  
  const user = request.user

  if (user._id.toString() !== oldBlog.user.toString()) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const newBlog = {
    ...request.body,
    user: user._id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})

  response.json(updatedBlog)

})

module.exports = blogsRouter