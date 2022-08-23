import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async content => {
	const object = { content, votes: 0 }
	const response = await axios.post(baseUrl, object)
	return response.data
}

const voteOnAnecdote = async id => {
	const response = await axios.get(`${baseUrl}/${id}`)
	const oldObj = response.data
	const newObj = {
		...oldObj, votes: oldObj.votes + 1
	}
	await axios.put(`${baseUrl}/${id}`, newObj)
}

export default { getAll, createNew, voteOnAnecdote }