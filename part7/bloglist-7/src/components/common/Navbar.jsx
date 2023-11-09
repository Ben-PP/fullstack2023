import { Link } from 'react-router-dom'
import UserHeader from '../user/UserHeader'

const Navbar = () => {
  const styleItem = {
    padding: 5
  }
  const styleDiv = {
    width: '100%',
    backgroundColor: 'gray',
    padding: 10
  }

  return (
    <div style={styleDiv}>
      <Link style={styleItem} to='/'>
        Blogs
      </Link>
      <Link style={styleItem} to='/users'>
        Users
      </Link>
      <UserHeader style={styleItem} />
    </div>
  )
}

export default Navbar
