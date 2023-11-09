import { useParams } from 'react-router-dom'
import { useUsers } from '../../contexts/UsersContext'

const User = () => {
  const usersData = useUsers()
  const id = useParams().id
  const user = usersData.all.find((u) => u.id === id)
  if (!user) {
    return null
  }
  console.log(user)
  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </>
  )
}

export default User
