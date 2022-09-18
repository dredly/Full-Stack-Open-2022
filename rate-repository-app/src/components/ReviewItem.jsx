import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import ReviewActions from './ReviewActions';
import Text from './Text';

const styles = StyleSheet.create({
	reviewContainer: {
		display: 'flex',
		flexDirection: 'row'
	},
	ratingDisplay: {
		marginHorizontal: 6,
		borderColor: theme.colors.primary,
		borderWidth: 2,
		alignSelf: 'flex-start',
		width: 44,
		height: 44,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 22
	},
	flexShrink: {
		display: 'flex',
		flexShrink: 1
	}
});

const ReviewItem = ({ review }) => {
	const reviewHeading = review.repository 
		? review.repository.fullName
		: review.user.username;
	return (
		<>
			<View style={styles.reviewContainer}>
				<View style={styles.ratingDisplay}>
					<Text color='primary' fontSize='subheading'>{review.rating}</Text>
				</View>
				<View style={styles.flexShrink}>
					<Text fontWeight='bold'>{reviewHeading}</Text>
					<Text color='textSecondary'>{new Intl.DateTimeFormat('en-gb').format(new Date(review.createdAt))}</Text>
					<Text>{review.text}</Text>
				</View>
			</View>
			{review.repository
				? <ReviewActions review={review}/>
				: null
			}
		</>
	);
};

export default ReviewItem;