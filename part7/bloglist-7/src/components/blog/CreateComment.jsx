import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useField } from '../../hooks'
import blogService from '../../services/blogs'
import { useBlogsDispatch } from '../../contexts/BlogsContext'

const CreateComment = ({ blogId }) => {
  const { reset: commentReset, ...comment } = useField('text')
  const queryClient = useQueryClient()
  const blogsDispatch = useBlogsDispatch()

  const newCommentMutation = useMutation({
    mutationFn: () => blogService.createComment(blogId, comment.value),
    onSuccess: (data) => {
      const blogsQueryData = queryClient.getQueryData(['blogs'])
      const newBlogs = blogsQueryData.map((b) =>
        b.id === blogId ? { ...b, comments: data.comments } : b
      )
      queryClient.setQueryData(['blogs'], newBlogs)
      blogsDispatch({ type: 'setAll', payload: newBlogs })
      commentReset()
    }
  })

  const addComment = (event) => {
    event.preventDefault()
    newCommentMutation.mutate()
  }

  return (
    <>
      <form onSubmit={addComment}>
        <input {...comment} />
        <button type='submit'>add comment</button>
      </form>
    </>
  )
}

CreateComment.propTypes = {
  blogId: PropTypes.string.isRequired
}

export default CreateComment
