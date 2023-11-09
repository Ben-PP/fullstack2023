import PropTypes from 'prop-types'
import CreateComment from './CreateComment'

const Comments = ({ comments, blogId }) => {
  return (
    <>
      <h3>Comments</h3>
      <CreateComment blogId={blogId} />
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>
        })}
      </ul>
    </>
  )
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  blogId: PropTypes.string.isRequired
}

export default Comments
