import { useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import { ItemSeparator } from './RepositoryList';
import ReviewItem from './ReviewItem';
import { MY_REVIEWS } from '../graphql/queries';
import Text from './Text';

const MyReviewsPage = () => {
	const queryResult = useQuery(MY_REVIEWS);

	if (!queryResult.data) {
		return <Text>...Loading</Text>;
	}

	const reviews = queryResult.data.me.reviews.edges.map(edge => edge.node);
	return (
		<FlatList 
			data={reviews}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={ItemSeparator}
		/>
	);
};

export default MyReviewsPage;