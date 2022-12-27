const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try{
    const blog = new Blog({
      ...body,
      likes: body.likes || 0
    })
    const result = await blog.save()
    response.status(201).json(result) 
  } catch(exception) {
    response.status(400).send(exception)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {...request.body}

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

  response.json(updatedBlog)

})

module.exports = blogsRouter