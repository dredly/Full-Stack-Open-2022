import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useState } from 'react';
import FilteredRepositoryList from './FilteredRepositoryList';
import RepositorySearchBar from './RepositorySearchbar';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
	const [ ordering, setOrdering ] = useState('CREATED_AT DESC');
	// eslint-disable-next-line no-unused-vars
	const [actualQuery, setActualQuery] = useState('');
	const changeActualQuery = (query) => {
		setActualQuery(query);
	};


	return (
		<>
			<RepositorySearchBar changeActualQuery={changeActualQuery}/>
			<Picker
				selectedValue={ordering}
				onValueChange={(itemValue) => {
					setOrdering(itemValue);
					console.log('itemValue', itemValue);
				}}>
				<Picker.Item label="Latest repositories" value="CREATED_AT DESC" />
				<Picker.Item label="Highest rated repositories" value="RATING_AVERAGE DESC" />
				<Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE ASC" />
			</Picker>
			<FilteredRepositoryList ordering={ordering} actualQuery={actualQuery}/>
		</>
	);
};

export default RepositoryList;