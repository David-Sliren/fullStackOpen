const dumpin = (blog) => 1

const blogs = [
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 5
  },
  {
    title: 'Type wars 2',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
  }
]

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0)
}

module.exports = { dumpin, totalLikes, blogs }
