import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { View, Pressable, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
	paddedView: {
		padding: 4
	},
	submitButton: {
		backgroundColor: theme.colors.primary,
		display: 'flex',
		alignItems: 'center',
		borderRadius: 4,
		padding: 8
	},
	lightText: {
		color: theme.colors.light
	}
});

const SignUpForm = ({ onSubmit }) => {
	return (
		<View style={styles.paddedView}>
			<FormikTextInput testID="usernameInput" name="username" placeholder="username"/>
			<FormikTextInput testID="passwordInput" name="password" placeholder="password" secureTextEntry/>
			<FormikTextInput testID="passwordConfirmationInput" name="passwordConfirmation" placeholder="password confirmation" secureTextEntry/>
			<Pressable onPress={onSubmit} style={styles.submitButton}>
				<Text testID='signInButton' style={styles.lightText}>Sign up</Text>
			</Pressable>
		</View>
	);
};

export default SignUpForm;