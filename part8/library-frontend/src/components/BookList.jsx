import { PropTypes } from 'prop-types'

const BookList = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books
          ? books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  )
}
BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      published: PropTypes.number.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    })
  )
}

export default BookList
