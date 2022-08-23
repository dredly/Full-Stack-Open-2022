import { useState } from "react";

export const useField = type => {
	const [value, setValue] = useState('')

	const onChange = evt => {
		setValue(evt.target.value)
	}

	const reset = () => {
		setValue('')
	}

	return { 
		input: {type, value, onChange}, 
		reset 
	}
}