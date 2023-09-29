import { useState } from 'react'

const CreateBlog = ({createBlog}) => {
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
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author: <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url: <input
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog