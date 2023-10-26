import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const sendNotification = (message) => {
    dispatch({type: 'SET', payload: message})
    setTimeout(()=> {
      dispatch({type: 'CLEAR'})
    }, 5000)
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      sendNotification('Anecdote created')
    },
    onError: () => {
      sendNotification('Anecdote must be at least 5 letters')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
