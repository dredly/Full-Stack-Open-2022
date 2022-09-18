import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';
import { ItemSeparator } from './RepositoryList';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import Text from './Text';
import { FlatList } from 'react-native';

const RepositoryView = () => {
	const repositoryId = useParams().id;
	const { repository, fetchMore } = useRepository({repositoryId, first: 5});
	if (!repository) {
		return <Text>Loading...</Text>;
	}

	const reviews = repository.reviews.edges.map(edge => edge.node);

	const onEndReach = () => {
		console.log('You have reached the end');
		fetchMore();
	};

	return (
		<FlatList 
			data={reviews}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => (
				<>
					<RepositoryInfo repository={repository} />
					<ItemSeparator />
				</>
			)}
			onEndReached={onEndReach}
			onEndReachedThreshold={0.1}
		/> 
	);
};

export default RepositoryView;