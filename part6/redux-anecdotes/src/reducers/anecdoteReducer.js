import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      return state.map(anecdote => {
        if (anecdote.id !== action.payload.id) {
          return anecdote
        } else {
          return action.payload
        }
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
export const { setAnecdotes, appendAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const modifiedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(voteAnecdote(modifiedAnecdote))
  }
}

export default anecdoteSlice.reducer