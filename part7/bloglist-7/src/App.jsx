import { useState, useEffect, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationDispatch } from './contexts/NotificationContext'
import { useBlogs, useBlogsDispatch } from './contexts/BlogsContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const notificationDispatch = useNotificationDispatch()
  const blogs = useBlogs()

  const blogsDispatch = useBlogsDispatch()

  const resultBlogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    initialData: []
  })
  useEffect(() => {
    blogsDispatch({ type: 'setAll', payload: resultBlogs.data })
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (resultBlogs.isLoading) {
    return <div>Loading data...</div>
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({
        type: 'setError',
        payload: 'Invalid credentials'
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
  }

  const loginView = () => {
    return (
      <div>
        <h1>Log in to application</h1>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const blogView = () => {
    return (
      <div>
        <h2>blogs</h2>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <CreateBlog blogFormRef={blogFormRef} />
        </Togglable>
        {blogs !== null ? (
          blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} username={user.username} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification />
      {!user && loginView()}
      {user && blogView()}
    </div>
  )
}

export default App
