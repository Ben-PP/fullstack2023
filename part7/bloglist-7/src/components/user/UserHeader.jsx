import { useUsers, useUsersDispatch } from '../../contexts/UsersContext'

const UserHeader = ({ style }) => {
  const users = useUsers()
  const userDispatch = useUsersDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    userDispatch({ type: 'logout' })
  }

  return (
    <div style={{ ...style, float: 'right' }}>
      {users.current.name} logged in
      <button style={{ marginLeft: 5 }} onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default UserHeader
