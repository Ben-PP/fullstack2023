import { useState } from "react"

const Blog = ({ blog }) => {

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
          <button>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog