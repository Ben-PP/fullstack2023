import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import blogService from '../services/blogs'

const CreateBlog = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

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
    newBlogMutation.mutate({ title, author, url })
    //await createBlog(title, author, url)
    blogFormRef.current.toggleVisibility()
    notificationDispatch({
      type: 'setInfo',
      payload: `a new blog ${title} by ${author} added`
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
            placeholder='Title of the blog'
          />
        </div>
        <div>
          author:{' '}
          <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
            placeholder='Author of the blog'
          />
        </div>
        <div>
          url:{' '}
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
            placeholder='Url for the blog'
          />
        </div>
        <div>
          <button id='submit' type='submit'>
            add
          </button>
        </div>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  blogFormRef: PropTypes.object.isRequired
}

export default CreateBlog
