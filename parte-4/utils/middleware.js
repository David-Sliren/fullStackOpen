const jwt = require('jsonwebtoken')
const User = require('../modules/user')

const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    request.token = null
    return next()
  }

  request.token = authorization.replace('Bearer ', '')
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token

  if (!token) {
    request.user = null
    return next()
  }

  try {
    const decodeToken = jwt.verify(token, process.env.SECRET)

    if (!decodeToken) {
      request.user = false
      return next()
    }

    request.user = await User.findById(decodeToken.id)
  } catch (error) {
    next(error)
  }

  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: `${req.path} no se pudo encontrar` })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'SyntaxError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = {
  getTokenFrom, userExtractor, unknownEndpoint, errorHandler
}
