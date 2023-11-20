import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { PropTypes } from 'prop-types'
import { ALL_BOOKS } from '../queries'
import NewBook from './NewBook'
import BookList from './BookList'

const Books = ({ token }) => {
  const [uniqueGenres, setUniqueGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })

  useEffect(() => {
    if (!result.loading && !selectedGenre) {
      const genres = new Set(result.data.allBooks.flatMap((b) => b.genres))
      setUniqueGenres([...genres])
    }
  }, [result, selectedGenre])

  return (
    <div>
      <h2>books</h2>

      {!result.loading ? <BookList books={result.data.allBooks} /> : null}
      <ul style={{ listStyle: 'none', display: 'flex' }}>
        {uniqueGenres.map((g) => (
          <li key={g}>
            <button
              style={selectedGenre === g ? { color: 'green' } : {}}
              onClick={() => {
                selectedGenre === g
                  ? setSelectedGenre(null)
                  : setSelectedGenre(g)
              }}
            >
              {g}
            </button>
          </li>
        ))}
      </ul>
      {token ? <NewBook /> : null}
    </div>
  )
}
Books.propTypes = {
  token: PropTypes.string
}

export default Books
