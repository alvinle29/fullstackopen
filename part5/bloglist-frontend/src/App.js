import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import PostForm from './components/PostForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')

      setNotification({
        text: 'login successfully',
        type: 'notifcation',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (exception) {
      setNotification({
        text: 'wrong credentials',
        type: 'error',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService
      .create(newBlog)

    setBlogs(blogs.concat(createdBlog))
    setNotification({
      text: `${newBlog.title} by ${newBlog.author} added`,
      type: 'notification'
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLike = async blog => {
    const likedBlog = await blogService.like(blog)

    setBlogs(
      blogs.map(blog =>
        blog.id === likedBlog.id
          ? { ...blog, likes: likedBlog.likes }
          : blog
      )
    )
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog)
      setBlogs(
        blogs.filter(currentBlog => currentBlog.id !== blog.id)
      )
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog)}
            handleDelete={() => handleDelete(blog)}
            user={user.username}
          />
        )}
    </div>
  )

  const postForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <PostForm
        handleNewBlog={handleNewBlog}
      />
    </Togglable>
  )

  return (
    <div>
      {user === null ?
        <div>
          <h1>Log in to application</h1>
          <Notification message={notification} />
          {loginForm()}
        </div> :
        <div>
          <h1>blogs</h1>
          <Notification message={notification} />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {postForm()}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App
