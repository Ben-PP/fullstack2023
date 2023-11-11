import { useUsers, useUsersDispatch } from '../../contexts/UsersContext'
import Button from '../common/Button'

const UserHeader = ({ className }) => {
  const users = useUsers()
  const userDispatch = useUsersDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    userDispatch({ type: 'logout' })
  }

  return (
    <div>
      {users.current.name}
      <Button className={'ml-2'} text='Logout' onClick={handleLogout} />
    </div>
  )
}

export default UserHeader
