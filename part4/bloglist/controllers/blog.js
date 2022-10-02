const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedblog = await blog.save()
  response.status(201).json(savedblog)
})

blogRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
  if (deletedBlog) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

module.exports = blogRouter