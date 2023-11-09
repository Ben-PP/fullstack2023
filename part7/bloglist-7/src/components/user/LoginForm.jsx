import { useState } from 'react'
import { useUsersDispatch } from '../../contexts/UsersContext'
import { useNotificationDispatch } from '../../contexts/NotificationContext'
import loginService from '../../services/login'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUsersDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username,
        password: password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      userDispatch({
        type: 'login',
        payload: { ...user }
      })
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({
        type: 'setError',
        payload: 'Invalid credentials'
      })
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
