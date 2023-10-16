import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.sort((a,b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const voteClick = (id) => {
    dispatch(vote(id))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteClick(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList