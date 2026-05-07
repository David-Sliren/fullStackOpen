const testingRouter = require('express').Router()
const Blog = require('../modules/blog')
const User = require('../modules/user')

testingRouter.post('/reset', async (request, response, next) => {
  try {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = testingRouter
