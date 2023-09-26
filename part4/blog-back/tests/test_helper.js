const bcrypt = require('bcrypt')
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
const initialUserList = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'root'
  },
  {
    username: 'second',
    name: 'Second User',
    password: 'second'
  }
]

const initialUsers = () => {
  return initialUserList.map((user) => {
    const passwordHash = bcrypt.hashSync(user.password, 10)
    const newUser = {
      ...user,
      passwordHash: passwordHash
    }
    delete newUser.password
    return newUser
  })
}

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
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb
}