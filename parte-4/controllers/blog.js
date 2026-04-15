const blogsRoutes = require('express').Router()
const Blog = require('../modules/blog')

blogsRoutes.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { userName: 1, id: 1 })

    response.status(200).json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRoutes.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  const userUnique = request.user

  try {
    if (!userUnique) {
      return response.status(400).json({ error: 'user is required' })
    }

    const newBlog = new Blog({
      title,
      author,
      url,
      likes,
      user: userUnique._id
    })

    const saveBlog = await newBlog.save()

    userUnique.blogs = userUnique.blogs.concat(saveBlog._id)
    await userUnique.save()

    response.status(201).json(saveBlog)
  } catch (error) {
    next(error)
  }
})

blogsRoutes.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  const user = request.user

  try {
    if (!user) return response.status(401).json({ error: 'Unauthorization' })

    const blog = await Blog.findById(id)
    if (!blog) return response.status(404).json({ error: 'Not found' })

    if (blog.user.toString() !== user._id.toString()) return response.status(401).json({ error: 'Only user can delete the blog' })

    const dataDelete = await Blog.findByIdAndDelete(id)

    user.blogs = user.blogs.filter(b => b.toString() !== id)

    await user.save()

    response.status(200).json({ dataDelete })
  } catch (error) {
    next(error)
  }
})

blogsRoutes.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const body = request.body

  try {
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const data = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
    response.status(202).json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRoutes
