import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const  id  = action.payload
      const anecdoteToUpdate = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdoteToUpdate, 
        votes: anecdoteToUpdate.votes + 1
      }
      return state
        .map(a => a.id !== id ? a : updatedAnecdote)
        .sort((a, b) => b.votes - a.votes)
    },
    add(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
        .sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { vote, add, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(add(newAnecdote))
  }
}

export const voteOnAnecdote = id => {
  return async dispatch => {
    await anecdoteService.voteOnAnecdote(id)
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer