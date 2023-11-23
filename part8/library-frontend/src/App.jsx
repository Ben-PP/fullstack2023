import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'
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

  useSubscription(BOOK_ADDED, {
    onData: ({ data: response }) => {
      const addedBook = response.data.bookAdded
      window.alert(`${addedBook.title} added`)

      const updateQuery = (genre) => {
        apolloClient.cache.updateQuery(
          { query: ALL_BOOKS, variables: { genre: genre } },
          ({ allBooks }) => {
            if (!allBooks) return
            return {
              allBooks: allBooks.concat(addedBook)
            }
          }
        )
      }
      updateQuery(null)
      addedBook.genres.forEach((g) => updateQuery(g))
    }
  })

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
