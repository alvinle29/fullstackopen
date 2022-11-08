import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlog, setNewBlog] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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
  })

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

  const handleAddingBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: author,
      url: url,
      user: user.name,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setAuthor('')
        setUrl('')
        setNotification({
          text: `${blogObject.title} by ${blogObject.author} added`,
          type: 'notification'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const postForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <form onSubmit={handleAddingBlog}>
            <div>
              Title:
              <input
                type='text'
                value={newBlog}
                name='Title:'
                onChange={({ target }) => setNewBlog(target.value)}
              />
            </div>
            <div>
              Author:
              <input
                type='text'
                value={author}
                name="Author:"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              Url:
              <input
                type='text'
                value={url}
                name="Url:"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type='submit'>create</button>
          </form>
        </div>
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    )
  }

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
