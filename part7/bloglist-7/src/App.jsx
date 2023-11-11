import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginView from './components/user/LoginView'
import Notification from './components/common/Notification'
import BlogView from './components/blog/BlogView'
import { useUsers, useUsersDispatch } from './contexts/UsersContext'
import UsersView from './components/user/UsersView'
import Navbar from './components/common/Navbar'
import User from './components/user/User'
import BlogNew from './components/blog/Blog'
import blogService from './services/blogs'

const App = () => {
  const users = useUsers()
  const userDispatch = useUsersDispatch()

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (localUser) {
      userDispatch({
        type: 'setUser',
        payload: localUser
      })
      blogService.setToken(localUser.token)
    }
  }, [userDispatch])

  return users.current ? (
    <>
      <Navbar />
      <div className='p-2'>
        <Notification />
        <Routes>
          <Route path='/' element={<BlogView />} />
          <Route path='/users' element={<UsersView />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs/:id' element={<BlogNew />} />
        </Routes>
      </div>
    </>
  ) : (
    <LoginView />
  )
}

export default App
