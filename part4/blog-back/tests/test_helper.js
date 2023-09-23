const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    author: 'Ben',
    title: 'Dart on mahtava',
    url: 'https://dart.dev',
    likes: 45
  },
  {
    author: 'Jake',
    title: 'Why I Hate JavaScript',
    url: 'https://www.youtube.com/watch?v=aXOChLn5ZdQ',
    likes: 36
  },
  {
    author: 'Ben',
    title: 'Flutter is destroying React',
    url: 'https://flutter.dev',
    likes: 34
  },
  {
    author: 'Rose',
    title: '3 million toilets running Java',
    url: 'https://java.com',
    likes: 3
  },
  {
    author: 'Jake',
    title: 'Should Node.js Exist?',
    url: 'https://www.youtube.com/watch?v=M3BM9TB-8yA',
    likes: 2
  },
  {
    author: 'Jake',
    title: 'Rust is nice',
    url: 'https://rust-lang.org',
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'not a valid url' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const newBlog = {
  title: 'a new blog',
  author: 'new author',
  url: 'https://google.com'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  newBlog,
  nonExistingId,
  blogsInDb,
  usersInDb
}