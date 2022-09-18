import { useQuery } from '@apollo/client';
import { REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
	const { repositoryId, first} = variables;
	const { data, loading, fetchMore, ...result } = useQuery(REPOSITORY, {
		fetchPolicy: 'cache-and-network',
		variables: { repositoryId, first }
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

		if (!canFetchMore) {
			console.log('Cannot fetch more');
			return;
		} 

		console.log('Fetching more');

		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
				...variables
			}
		});
	};

	return {
		repository: data?.repository,
		fetchMore: handleFetchMore,
		loading,
		...result
	};
};

export default useRepository;