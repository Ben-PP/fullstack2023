import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import blogService from '../../services/blogs'
import { useUsers } from '../../contexts/UsersContext'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const users = useUsers()
  const [showBlog, setShowBlog] = useState(false)
  const queryClient = useQueryClient()

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (data) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === data.id ? data : b))
      )
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['blogs'])
    }
  })

  const updateLikes = () => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const deleteBlog = (id) => {
    deleteBlogMutation.mutate(id)
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title}{' '}
      <button onClick={() => setShowBlog(!showBlog)}>
        {showBlog ? 'hide' : 'view'}
      </button>
      <div style={{ display: showBlog ? '' : 'none' }}>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>
          likes {`${blog.likes} `}
          <button onClick={updateLikes}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {users.current.username === blog.user.username ? (
          <button className='removeButton' onClick={() => deleteBlog(blog.id)}>
            remove
          </button>
        ) : null}
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
