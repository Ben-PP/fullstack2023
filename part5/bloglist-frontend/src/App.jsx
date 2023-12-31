import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import pushNotificationService from './services/notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [pushMessage, setPushMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogsSorted(blogs)
    }
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
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      pushNotificationService.error(
        'wrong credentials',
        setPushMessage)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
  }

  const setBlogsSorted = (newBlogs) => {
    console.log(newBlogs)
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
  }

  const createBlog = async (title, author, url) => {
    const newBlog = await blogService.create({
      title: title,
      author: author,
      url: url
    })
    setBlogsSorted(blogs.concat({
      ...newBlog,
      user: {
        id: newBlog.user,
        name: user.name,
        username: user.username
      }
    }))
    blogFormRef.current.toggleVisibility()
    pushNotificationService.success(`a new blog ${title} by ${author} added`, setPushMessage)
  }

  const updateLikes = async (blog) => {
    const updatedBlog = await blogService.update(
      blog.id,
      {
        ...blog,
        likes: blog.likes + 1
      }
    )
    setBlogsSorted(blogs.map(b => b.id !== blog.id ? b : {
      ...updatedBlog,
      user: {
        id: blog.user,
        name: blog.user.name,
        username: blog.user.username
      }
    }))
  }

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find(b => b.id === id)
    if (!window.confirm(`Remove blog ${blogToDelete.title}`)) {
      return
    }
    await blogService.deleteBlog(id)
    setBlogs(blogs.filter(b => b.id !== id))
  }

  const loginView = () => {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification notification={pushMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword} />
      </div>
    )
  }

  const blogView = () => {
    return (
      <div>
        <Notification notification={pushMessage} />
        <h2>blogs</h2>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <CreateBlog createBlog={createBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} username={user.username} updateLikes={updateLikes} deleteBlog={deleteBlog} />
        )}
      </div>
    )
  }

  return (
    <div>
      {!user && loginView()}
      {user && blogView()}
    </div>
  )
}

export default App