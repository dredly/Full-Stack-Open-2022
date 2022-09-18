import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
	errorText: {
		marginTop: 5,
		color: '#d73a4a'
	},
	textInput: {
		padding: 10,
	},
	inputHolder: {
		borderColor: '#999999',
		borderWidth: 2,
		borderRadius: 3,
		marginBottom: 4
	},
});

const FormikTextInput = ({ name, ...props }) => {
	const [field, meta, helpers] = useField(name);
	const showError = meta.touched && meta.error;

	return (
		<>
			<View style={showError ? {...styles.inputHolder, borderColor: '#d73a4a'} : styles.inputHolder}>
				<TextInput
					style={styles.textInput}
					onChangeText={value => helpers.setValue(value)}
					onBlur={() => helpers.setTouched(true)}
					value={field.value}
					error={showError}
					{...props}
				/>
			</View>
			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	);
};

export default FormikTextInput;