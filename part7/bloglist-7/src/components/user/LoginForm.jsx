import { useState } from 'react'
import { useUsersDispatch } from '../../contexts/UsersContext'
import { useNotificationDispatch } from '../../contexts/NotificationContext'
import loginService from '../../services/login'
import Button from '../common/Button'

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

  const fieldStyle = `
    mt-2 p-1 border rounded focus:border-green-600 focus:outline-none
  `

  return (
    <div className='flex items-center justify-center'>
      <form onSubmit={handleLogin}>
        <div className='text-center'>
          <h3 className='text-xl'>Username</h3>
          <input
            id='username'
            className={fieldStyle}
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='text-center'>
          <h3 className='text-xl'>Password</h3>
          <input
            id='password'
            className={fieldStyle}
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className='text-center p-2'>
          <Button id='login-button' type='submit' text='login' />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
