// TODO: refactor to combne timeoutReducer with this one
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	message: '',
	isShown: false,
	timeOutId: NaN
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		changeNotification(state, action) {
			const newMessage = action.payload
			state.message = newMessage
			//Hides the message if it is set to an empty string
			if (newMessage) {
				state.isShown = true
			} else {
				state.isShown = false
			}
		},
		saveTimeoutId(state, action) {
			const newId = action.payload
			state.timeOutId = newId
		}
	}
})

export const { changeNotification, saveTimeoutId } = notificationSlice.actions

export const setNotification = (text, time) => {
	return async (dispatch, getState) => {
		const currentTimeoutId = getState().notification.timeOutId
		if (currentTimeoutId) {
			clearTimeout(currentTimeoutId)
		}
		dispatch(changeNotification(text))
		const timeOutId = setTimeout(() => {
			dispatch(changeNotification(''))
			dispatch(saveTimeoutId(NaN))
		}, time)
		dispatch(saveTimeoutId(timeOutId))
	}
}	

export default notificationSlice.reducer