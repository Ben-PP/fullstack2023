import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(null)
  const apolloClient = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    apolloClient.resetStore()
  }

  return (
    <div>
      <div>
        <Link to="/">Authors</Link>
        <Link to="/books">Books</Link>
        {token ? <Link to="/recommendations">Recommendations</Link> : null}
        {!token ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books token={token} />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  )
}

export default App
