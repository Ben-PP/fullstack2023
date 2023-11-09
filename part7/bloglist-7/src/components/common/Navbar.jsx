import { Link } from 'react-router-dom'
import UserHeader from '../user/UserHeader'

const Navbar = () => {
  const style = {
    padding: 5
  }
  return (
    <div>
      <Link style={style} to='/'>
        Blogs
      </Link>
      <Link style={style} to='/users'>
        Users
      </Link>
      <UserHeader style={style} />
    </div>
  )
}

export default Navbar
