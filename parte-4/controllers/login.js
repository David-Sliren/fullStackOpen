const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../modules/user')

loginRouter.post('/', async (request, response, next) => {
  const { userName, password } = request.body

  const user = await User.findOne({ userName })

  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(userName && passwordCorrect)) return response.status(401).json({ error: 'UserName or password incorrect' })

  const userFromToken = {
    userName: user.userName,
    id: user._id
  }

  try {
    const token = await jwt.sign(userFromToken, process.env.SECRET)
    response.status(200).send({ token, userName: user.userName, name: user.name })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
