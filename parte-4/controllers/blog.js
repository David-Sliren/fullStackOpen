const blogsRoutes = require('express').Router()
const Blog = require('../modules/blog')
// const { error } = require('../utils/logger')

blogsRoutes.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})

    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRoutes.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogsRoutes.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    await Blog.findByIdAndDelete(id)
    response.status(204)
  } catch (error) {
    next(error)
  }
})

blogsRoutes.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const body = request.body
  console.log('body: ', body)

  try {
    const newBlog = { title: body.title, author: body.author, url: body.url, likes: body.likes }
    const data = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
    response.status(202).json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRoutes
