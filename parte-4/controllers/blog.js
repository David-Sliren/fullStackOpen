const blogsRoutes = require('express').Router()
const Blog = require('../modules/blog')

// Gets ----
blogsRoutes.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { userName: 1, id: 1 })

    response.status(200).json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRoutes.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const blogId = await Blog.findById(id)

    if (!blogId) return res.status(404).json({ error: 'Blog  not found' })

    res.status(200).json(blogId)
  } catch (error) {
    next(error)
  }
})

// Posts ----

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
      user: userUnique._id,
      comments: []
    })

    const saveBlog = await newBlog.save()

    userUnique.blogs = userUnique.blogs.concat(saveBlog._id)
    await userUnique.save()

    response.status(201).json(saveBlog)
  } catch (error) {
    next(error)
  }
})

// Deletes ---

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

// Patch ------

blogsRoutes.patch('/:id/likes', async (request, response, next) => {
  const { id } = request.params
  const { likes } = request.body

  try {
    const newBlog = {
      likes
    }

    const like = await Blog.findByIdAndUpdate(id, { $set: newBlog }, { returnDocument: 'after', runValidators: true })
    if (!like) return response.status(400).json({ error: 'bad request' })
    response.status(200).json(like)
  } catch (error) {
    next(error)
  }
})

blogsRoutes.patch('/:id/comments', async (request, response, next) => {
  const { id } = request.params
  const { text } = request.body
  const user = request.user

  try {
    const newComment = { text, user: user._id }
    const comment = await Blog.findByIdAndUpdate(id, { $push: { comments: newComment } }, { returnDocument: 'after', runValidators: true })
    if (!comment) return response.status(400).json({ error: 'bad request' })
    response.status(201).json(comment)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRoutes
