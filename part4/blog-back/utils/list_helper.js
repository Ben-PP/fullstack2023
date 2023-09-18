const _ = require('lodash')

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    throw 'List can not be empty'
  }
  return _.maxBy(blogs, 'likes')
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    throw 'List can not be empty'
  }
  const counted = _.countBy(blogs, 'author')
  return _.maxBy(Object.keys(counted).map(key => {
    return { author: key, blogs: counted[key] }
  }), 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    throw 'List can not be empty'
  }
  const authors = _.groupBy(blogs, 'author')
  const likesByAuthor = []
  _.forEach(authors, (value, key) => {
    likesByAuthor.push({ author: key, likes: _.sumBy(value, 'likes') })
  })
  return _.maxBy(likesByAuthor, 'likes')
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}