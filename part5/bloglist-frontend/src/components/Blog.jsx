import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, updateLikes, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showBlog, setShowBlog] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setShowBlog(!showBlog)}>{showBlog ? 'hide' : 'view'}</button>
      <div style={{ display: showBlog ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p>
          likes {`${blog.likes} `}
          <button onClick={() => updateLikes(blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {username === blog.user.username ? <button onClick={() => deleteBlog(blog.id)}>remove</button> : null}
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog