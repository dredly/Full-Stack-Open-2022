import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, voteOnAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  	const dispatch = useDispatch()
	useEffect(() => {
    	dispatch(initializeAnecdotes())
  	}, [dispatch])
	const currentFilter = useSelector(state => state.filter)
	const anecdotes = useSelector(state => state.anecdotes)
		.filter(a => a.content.toLowerCase().includes(currentFilter.toLowerCase()))
	
	const handleVote = id => {
    	dispatch(voteOnAnecdote(id))
		const content = anecdotes.find(a => a.id === id).content
		dispatch(setNotification(`You voted - ${content}`, 5000))
  	}

	return (
		<>
			{anecdotes.map(anecdote =>
        		<div key={anecdote.id}>
          			<div>
            			{anecdote.content}
          			</div>
          			<div>
            			has {anecdote.votes}
            			<button onClick={() => handleVote(anecdote.id)}>vote</button>
          			</div>
        		</div>
      		)}
		</>
	)
}

export default AnecdoteList