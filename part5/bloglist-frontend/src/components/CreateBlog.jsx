import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input
            id='title'
            value={title}
            onChange={handleTitleChange}
            placeholder='Title of the blog'
          />
        </div>
        <div>
          author: <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
            placeholder='Author of the blog'
          />
        </div>
        <div>
          url: <input
            id='url'
            value={url}
            onChange={handleUrlChange}
            placeholder='Url for the blog'
          />
        </div>
        <div>
          <button id='submit' type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlog