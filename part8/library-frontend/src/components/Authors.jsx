import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { PropTypes } from 'prop-types'
import SetBirthyear from './SetBirthyear'
import { useEffect, useState } from 'react'

const Authors = ({ token }) => {
  const [authors, setAuthors] = useState([])
  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (!result.loading) setAuthors(result.data.allAuthors)
  }, [result])

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {authors.length > 0 && token ? <SetBirthyear authors={authors} /> : null}
    </div>
  )
}
Authors.propTypes = {
  token: PropTypes.string
}

export default Authors
