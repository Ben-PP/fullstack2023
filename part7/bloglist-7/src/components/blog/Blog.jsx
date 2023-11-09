import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import blogService from '../../services/blogs'
import { useBlogs, useBlogsDispatch } from '../../contexts/BlogsContext'
import { useUsers } from '../../contexts/UsersContext'
import { useEffect, useState } from 'react'
import Comments from './Comments'

const BlogNew = () => {
  const blogs = useBlogs()
  const users = useUsers()
  const id = useParams().id
  const [blog, setBlog] = useState()
  const queryClient = useQueryClient()
  const blogsDispatch = useBlogsDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setBlog(blogs.find((b) => b.id === id))
  }, [blogs, id])

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (data) => {
      const blogsQueryData = queryClient.getQueryData(['blogs'])
      const newBlogs = blogsQueryData.map((b) =>
        b.id === data.id ? { ...b, likes: data.likes } : b
      )
      queryClient.setQueryData(['blogs'], newBlogs)
      blogsDispatch({ type: 'setAll', payload: newBlogs })
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: () => blogService.deleteBlog(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['blogs'])
    }
  })

  if (!blog) return null

  const updateLikes = () => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const deleteBlog = () => {
    deleteBlogMutation.mutate()
    navigate('/')
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url} target='blank'>
        {blog.url}
      </a>
      <p>
        {blog.likes} likes <button onClick={updateLikes}>like</button>
      </p>
      {users.current.username === blog.user.username ? (
        <button className='removeButton' onClick={() => deleteBlog(blog.id)}>
          remove
        </button>
      ) : null}
      <Comments comments={blog.comments ?? []} blogId={blog.id} />
    </>
  )
}

export default BlogNew
