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

  const tailwind = `
    text-white
  `

  return (
    <div className='bg-green-500 p-2 text-lg sticky top-0 w-full'>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td className='text-center'>
              <Link className={tailwind} to='/'>
                Blogs
              </Link>
            </td>
            <td className='h-full bg-white w-0.5'></td>
            <td className='text-center'>
              <Link className={tailwind} to='/users'>
                Users
              </Link>
            </td>
            <td className='text-right'>
              <UserHeader />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Navbar
