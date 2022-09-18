import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const FilteredRepositoryList = ({ordering, actualQuery}) => {
	const { repositories, fetchMore } = useRepositories({
		ordering, 
		searchQuery: actualQuery,
		first: 8,
	});
	const onEndReach = () => {
		console.log('You have reached the end');
		fetchMore();
	};

	return <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} />;
};

export default FilteredRepositoryList;