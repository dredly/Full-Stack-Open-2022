import { FlatList, Pressable, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import { ItemSeparator } from './RepositoryList';

const RepositoryListContainer = ({ repositories, onEndReach }) => {
	const navigate = useNavigate();
	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: [];

	const goToRepository = (repositoryId) => {
		navigate(`/${repositoryId}`);
	};

	return (
		<View>
			<FlatList
				data={repositoryNodes}
				ItemSeparatorComponent={ItemSeparator}
				keyExtractor={({ id }) => id}
				renderItem={({item}) => (
					<Pressable onPress={() => goToRepository(item.id)}>
						<RepositoryItem item={item}/>
					</Pressable>
				)}
				onEndReached={onEndReach}
				onEndReachedThreshold={0.5}
			/>
		</View>
	);
};

export default RepositoryListContainer;