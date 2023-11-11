import { useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Togglable from '../common/Togglable'
import CreateBlog from './CreateBlog'
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
      <h2 className='text-h1'>Blogs</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <CreateBlog blogFormRef={blogFormRef} />
      </Togglable>

      {blogs !== null ? (
        blogs.map((blog) => {
          return (
            <div key={blog.id} className='border-2 p-1 mt-2 rounded'>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          )
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

const style = {
  padding: 5,
  margin: 5,
  border: 'solid'
}

export default BlogView
