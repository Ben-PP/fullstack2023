const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers())
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Blog API tests', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('there is correct amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })
  test('returned blogs have field called \'id\'', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  describe('Viewing specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const result = await api.get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(result.body).toEqual(blogToView)
    })
    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      await api.get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })
    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('Addition of new blog', () => {
    test('succeed with valid data', async () => {
      const result = await api.post('/api/login')
        .send({
          username: 'second',
          password: 'second'
        })
      const token = result.body.token
      const newBlog = {
        title: 'a new blog',
        author: 'new author',
        url: 'https://google.com'
      }
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const response = await api.get('/api/blogs')
      const titles = response.body.map(blog => blog.title)
      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(titles).toContain('a new blog')
    })
    test('fails with 401 if token is not provided', async () => {
      const newBlog = {
        title: 'a new blog',
        author: 'new author',
        url: 'https://google.com'
      }
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })
    test('likes will be 0 if not given', async () => {
      const passwordResult = await api.post('/api/login')
        .send({
          username: 'second',
          password: 'second'
        })
      const token = passwordResult.body.token
      const result = await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(helper.newBlog)
      const newBlog = result.body
      expect(newBlog.likes).toBe(0)
    })
    test('fails with status code 400 if data invalid', async () => {
      const badBlogNoTitle = {
        author: 'Bad Guy',
        url: 'https://google.com'
      }
      const badBlogNoUrl = {
        title: 'I am a bad blog',
        author: 'Bad Guy'
      }

      const passwordResult = await api.post('/api/login')
        .send({
          username: 'second',
          password: 'second'
        })
      const token = passwordResult.body.token

      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(badBlogNoTitle)
        .expect(400)
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(badBlogNoUrl)
        .expect(400)
    })
  })

  describe('Deletion of a blog', () => {
    // TODO Test for the number of blogs
    /*test('succeeds with status 204', async () => {
      const passwordResult = await api.post('/api/login')
        .send({
          username: 'second',
          password: 'second'
        })
      const token = passwordResult.body.token
      const blogsInDb = await helper.blogsInDb()
      const specificBlog = blogsInDb[0]
      await api.delete(`/api/blogs/${specificBlog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
    })*/
    /*test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api.delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })*/
  })

  describe('Updating a blog', () => {
    // TODO Tests for updating a blog
    /*test('succeeds with status code 200 and likes to be updated', async () => {
      const blogsInDb = await helper.blogsInDb()
      const specificBlog = blogsInDb[0]
      const blog = { likes: 5555 }
      const result = await api.put(`/api/blogs/${specificBlog.id}`)
        .send(blog)
        .expect(200)
      expect(result.body.likes).toBe(5555)
    })*/
    test('fails with status code 404 if blog is not found', async () => {
      const nonExistingId = await helper.nonExistingId()
      const blog = { likes: 10 }
      await api.put(`/api/blogs${nonExistingId}`)
        .send(blog)
        .expect(404)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})