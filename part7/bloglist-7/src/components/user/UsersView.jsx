import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
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
      <h2 className='text-h1'>Users</h2>
      <table>
        <thead className='text-center'>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
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
