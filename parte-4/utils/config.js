require('dotenv').config()

const MONGO_URI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST : process.env.MONGODB_URI

const PORT = process.env.PORT

module.exports = { MONGO_URI, PORT }
