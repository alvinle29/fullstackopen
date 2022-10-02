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

  test('fails with status code 400 if missing data', async () => {
    const newBlog = {
      author: 'Bob Smith'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      likes: blogToUpdate.likes + 1
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    expect(response.body.likes).toBe(blogToUpdate.likes + 1)
  })
})

describe('adding users:', () => {
  /*test('creating a new user', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'alvinle29',
      name: 'Bach',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })*/

  test('creating an invalid user (short username)', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'al',
      name: 'Bach',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username is too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('creating an invalid user (short password)', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'alvinle29',
      name: 'Bach',
      password: 'pa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is too short or missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('creating an invalid user (username is missing)', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Bach',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // expect(result.body.error).toContain('password is too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('creating an invalid user (password is missing)', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'alvinle29',
      name: 'Bach'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // expect(result.body.error).toContain('password is too short or missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})