const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, required: true },
  comments: [{
    text: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    createat: { type: Date, default: Date.now }
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (doc, res) => {
    res.id = res._id.toString()
    delete res._id
    delete res.__v

    // Limpiar id de los comentarios
    if (res.comments) {
      res.comments = res.comments.map(comment => {
        const commentObj = comment.toObject ? comment.toObject() : comment
        commentObj.id = commentObj._id.toString()
        delete commentObj._id
        return commentObj
      })
    }
  }
})

module.exports = mongoose.model('Blog', blogSchema)
