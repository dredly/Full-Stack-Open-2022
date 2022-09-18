import { Searchbar } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

const RepositorySearchBar = ({changeActualQuery}) => {
	const [searchQuery, setSearchQuery] = useState('');

	const debouncedRequest = useDebouncedCallback((query) => changeActualQuery(query), 300);

	const onChangeSearch = (query) => {
		setSearchQuery(query);
		debouncedRequest(query);
	};

	return (
		<Searchbar
			placeholder="Search"
			onChangeText={onChangeSearch}
			value={searchQuery}
		/>
	);
};

export default RepositorySearchBar;