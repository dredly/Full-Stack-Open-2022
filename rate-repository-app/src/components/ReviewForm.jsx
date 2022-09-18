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


const ReviewForm = ({ onSubmit }) => {
	return (
		<View style={styles.paddedView}>
			<FormikTextInput testID="ownerNameInput" name="ownerName" placeholder="Repository owner name"/>
			<FormikTextInput testID="repoNameInput" name="repositoryName" placeholder="Repository name"/>
			<FormikTextInput testID="ratingInput" name="rating" placeholder="Rating between 0 and 100"/>
			<FormikTextInput testID="textInput" name="text" placeholder="Review"/>
			<Pressable onPress={onSubmit} style={styles.submitButton}>
				<Text testID='createReviewButton' style={styles.lightText}>Create a review</Text>
			</Pressable>
		</View>
	);
};

export default ReviewForm;