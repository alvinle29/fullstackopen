const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

describe('check id', () => {
  test('is ID written in `id` field insted of `_id`', async () => {
    const response = await api
      .get('/api/blogs')
    
    expect(response.body[0].id).toBeDefined()
  })
})

describe('new blog added', () => {
  test('a new blog is added', async () => {
    const newBlog = {
      title: 'abcdefg',
      author: 'Robert Sydney Jr.',
      url: 'https://www.youtube.com/results?search_query=mc+mu',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogToCheck = await helper.blogsInDb()
    expect(blogToCheck).toHaveLength(helper.initialBlogs.length + 1)
  })
})

describe('new blog added', () => {
  test('a new blog is added', async () => {
    const newBlog = {
      title: 'abcdefg',
      author: 'Robert Sydney Jr.',
      url: 'https://www.youtube.com/results?search_query=mc+mu',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })
})


afterAll(() => {
  mongoose.connection.close()
})