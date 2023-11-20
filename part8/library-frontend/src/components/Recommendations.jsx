import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import { useEffect } from 'react'
import BookList from './BookList'

const Recommendations = () => {
  const [genre, setGenre] = useState()
  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  const meQuery = useQuery(ME)

  useEffect(() => {
    if (!meQuery.loading && meQuery.data.me) {
      setGenre(meQuery.data.me.favoriteGenre)
    }
  }, [meQuery])

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre</p>
      {!booksQuery.loading ? (
        <BookList books={booksQuery.data.allBooks} />
      ) : null}
    </div>
  )
}

export default Recommendations
