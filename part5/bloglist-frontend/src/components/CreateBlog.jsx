import { useState } from 'react'
import blogService from '../services/blogs'
import pushNotificationService from '../services/notifications'

const CreateBlog = ({setNotification}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()

    const response = await blogService.create({
      title: title,
      author: author,
      url: url
    })
    pushNotificationService.success(`a new blog ${title} by ${author} added`, setNotification)
    console.log(response)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <h2>Add a blog</h2>
      <form onSubmit={createBlog}>
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