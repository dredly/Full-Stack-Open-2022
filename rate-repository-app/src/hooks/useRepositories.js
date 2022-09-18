import { useQuery } from '@apollo/client';
import { REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
	const { ordering, searchQuery, first } = variables;
	const [orderBy, orderDirection] = ordering.split(' ');
	const { data, loading, fetchMore, ...result } = useQuery(REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			orderBy,
			orderDirection,
			searchKeyword: searchQuery,
			first,
		}
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			console.log('Cannot fetch more');
			return;
		} 

		console.log('Fetching more');

		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
				...variables
			}
		});
	};

	return {
		repositories: data?.repositories,
		fetchMore: handleFetchMore,
		loading,
		...result
	};
};

export default useRepositories;