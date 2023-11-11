import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useNotificationDispatch } from '../../contexts/NotificationContext'
import blogService from '../../services/blogs'
import Button from '../common/Button'

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
  const fieldStyle = `
    mt-2 p-1 border rounded focus:border-green-600 focus:outline-none
  `
  const fieldTitleStyle = `text-right pr-2`
  return (
    <div>
      <h2 className='text-h2'>Add a blog</h2>
      <form onSubmit={addBlog}>
        <table>
          <tbody>
            <tr>
              <td className={fieldTitleStyle}>title</td>
              <td>
                <input
                  id='title'
                  className={fieldStyle}
                  value={title}
                  onChange={handleTitleChange}
                  placeholder='Title of the blog'
                />
              </td>
            </tr>
            <tr>
              <td className={fieldTitleStyle}>author</td>
              <td>
                <input
                  id='author'
                  className={fieldStyle}
                  value={author}
                  onChange={handleAuthorChange}
                  placeholder='Author of the blog'
                />
              </td>
            </tr>
            <tr>
              <td className={fieldTitleStyle}>url</td>
              <td>
                <input
                  id='url'
                  className={fieldStyle}
                  value={url}
                  onChange={handleUrlChange}
                  placeholder='Url for the blog'
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className='pb-2 pt-2'>
          <Button
            id='submit'
            type='submit'
            text='add'
            className={'bg-green-700'}
          />
        </div>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  blogFormRef: PropTypes.object.isRequired
}

export default CreateBlog
