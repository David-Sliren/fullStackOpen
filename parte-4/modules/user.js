const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (doc, res) => {
    res.id = res._id.toString()
    delete res._id
    delete res.__v
    delete res.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
