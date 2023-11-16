import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { EDIT_AUTHOR } from '../queries'

const SetBirthyear = ({ authors }) => {
  const [author, setAuthor] = useState(authors[0])
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    setBorn(author.born ?? '0')
  }, [author])

  const handleChange = (event) => {
    console.log(event.target.value)
    const author = authors.find((a) => a.name === event.target.value)
    setAuthor(author)
  }

  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: author.name, setBornTo: parseInt(born) } })
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <select value={author.name} onChange={handleChange}>
        {authors.map((author) => {
          return (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          )
        })}
      </select>
      <form onSubmit={submit}>
        <input
          type="text"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}
SetBirthyear.propTypes = {
  authors: PropTypes.array.isRequired
}

export default SetBirthyear
