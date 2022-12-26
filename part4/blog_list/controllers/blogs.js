const blogsRouter = require('express').Router()
const { hasUncaughtExceptionCaptureCallback } = require('process')
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

module.exports = blogsRouter