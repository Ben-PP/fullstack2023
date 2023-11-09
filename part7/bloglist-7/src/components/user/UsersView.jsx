import { useQuery } from '@tanstack/react-query'
import usersService from '../../services/users'
import { useUsers, useUsersDispatch } from '../../contexts/UsersContext'
import { useEffect } from 'react'

const UsersView = () => {
  const usersData = useUsers()
  const usersDispatch = useUsersDispatch()
  const resultUsers = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll
  })

  useEffect(() => {
    if (resultUsers.isSuccess) {
      usersDispatch({ type: 'setAll', payload: resultUsers.data })
    }
  }, [resultUsers.data, usersDispatch, resultUsers.isSuccess])

  const users = usersData.all

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
