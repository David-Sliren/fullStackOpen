const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../modules/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const getAll = await User.find({}).populate('blogs', { id: 1 })
    response.status(200).json(getAll)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { userName, name, password } = request.body
  if (!password || password.lenght < 4) {
    return response
      .status(400)
      .json({
        error: 'the password is required and must has more of 4 characters'
      })
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({ userName, name, passwordHash })

    const user = await newUser.save()

    response.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const deleteData = await User.findByIdAndDelete(id)
    if (!deleteData) return response.status(404).json({ error: 'Not found' })

    response.status(200).json({ deleteData })
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const userId = await User.findById(id).populate('blogs', {
      id: 1, title: 1
    })

    res.status(200).json(userId)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
