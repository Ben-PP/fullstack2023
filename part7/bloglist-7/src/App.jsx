import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginView from './components/user/LoginView'
import Notification from './components/common/Notification'
import BlogView from './components/blog/BlogView'
import { useUsers, useUsersDispatch } from './contexts/UsersContext'
import UsersView from './components/user/UsersView'
import Navbar from './components/common/Navbar'

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
    }
  }, [userDispatch])

  return (
    <>
      {users.current ? (
        <div>
          <Navbar />
          <Notification />
          <div>
            <Routes>
              <Route path='/' element={<BlogView />} />
              <Route path='/users' element={<UsersView />} />
            </Routes>
          </div>
        </div>
      ) : (
        <LoginView />
      )}
    </>
  )
}

export default App
