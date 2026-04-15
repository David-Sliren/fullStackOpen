// Express - Routes
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginsRouter = require('./controllers/login')

// Library
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

// Utils
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// Init database
mongoose.set('strictQuery', false)
logger.info(`conecting to mongo ${config.MONGO_URI}`)
mongoose.connect(config.MONGO_URI).then(logger.info('conect to mongo')).catch(error => logger.error(`can not connect to mongo ${error} `))

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(middleware.getTokenFrom)
app.use(middleware.userExtractor)

// Routes
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginsRouter)

// Error handdle
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
