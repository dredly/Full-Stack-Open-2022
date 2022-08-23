import { connect } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
	const addAnecdote = async evt => {
    	evt.preventDefault()
    	const content = evt.target.anecdoteContent.value
    	evt.target.anecdoteContent.value = ''
    	props.addNewAnecdote(content)
		props.setNotification(`You created - ${content}`, 5000)
  	}

	return (
		<>
			<h2>create new</h2>
      		<form onSubmit={addAnecdote}>
        		<div>
          			<input name="anecdoteContent" />
        		</div>
        		<button>create</button>
      		</form>
		</>
	)
}

const mapDispatchToProps = {
	addNewAnecdote,
	setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)