import { useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Togglable from '../common/Togglable'
import CreateBlog from './CreateBlog'
import Blog from './Blog'
import { useBlogs, useBlogsDispatch } from '../../contexts/BlogsContext'
import blogService from '../../services/blogs'

const BlogView = () => {
  const blogs = useBlogs()
  const blogFormRef = useRef()
  const blogsDispatch = useBlogsDispatch()

  const resultBlogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    initialData: []
  })
  useEffect(() => {
    blogsDispatch({ type: 'setAll', payload: resultBlogs.data })
  })
  if (resultBlogs.isLoading) {
    return <div>Loading data...</div>
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <CreateBlog blogFormRef={blogFormRef} />
      </Togglable>
      {blogs !== null ? (
        blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default BlogView
