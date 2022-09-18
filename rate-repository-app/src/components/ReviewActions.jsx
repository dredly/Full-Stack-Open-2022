import { View, Pressable, StyleSheet, Alert } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { MY_REVIEWS } from '../graphql/queries';

const styles = StyleSheet.create({
	horizontalFlex: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	reviewAction: {
		marginHorizontal: 8,
		padding: 8,
		borderRadius: 6,
		alignItems: 'center',
		flexGrow: 1
	},
	primaryBg: {
		backgroundColor: theme.colors.primary,
	},
	errorBg: {
		backgroundColor: theme.colors.error
	},
	lightText: {
		color: theme.colors.light
	},
});

const ReviewActions = ({ review }) => {
	const navigate = useNavigate();

	const [deleteReview] = useMutation(DELETE_REVIEW);
	const { refetch } = useQuery(MY_REVIEWS);

	const goToRepository = () => {
		navigate(`/${review.repository.id}`);
	};

	const handleDelete = async () => {
		await deleteReview({
			variables: {
				deleteReviewId: review.id
			}
		});
		refetch();
	};

	const showDeleteAlert = () => {
		return (
			Alert.alert(
				'Delete review', 
				'Are you sure you want to delete this review?',
				[
					{
						text: 'Cancel',
						style: 'cancel'
					},
					{ text: 'OK', onPress: handleDelete }
				]
			)
		);
	};

	return (
		<View style={styles.horizontalFlex}>
			<Pressable onPress={goToRepository} style={[styles.reviewAction, styles.primaryBg]}>
				<Text style={styles.lightText}>View repository</Text>
			</Pressable>
			<Pressable onPress={showDeleteAlert} style={[styles.reviewAction, styles.errorBg]}>
				<Text style={styles.lightText}>Delete review</Text>
			</Pressable>
		</View>
	);
};

export default ReviewActions;