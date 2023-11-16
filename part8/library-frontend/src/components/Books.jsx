import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import NewBook from './NewBook'

const Books = () => {
  const result = useQuery(ALL_BOOKS)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!result.loading
            ? result.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <NewBook />
    </div>
  )
}

export default Books
