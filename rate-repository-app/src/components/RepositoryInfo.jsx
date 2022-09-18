
import { View, Pressable, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
	githubLink: {
		backgroundColor: theme.colors.primary,
		marginHorizontal: 8,
		padding: 8,
		borderRadius: 6,
		alignItems: 'center'
	},
	githubLinkText: {
		color: theme.colors.light
	},
});

const RepositoryInfo = ({ repository }) => {
	
	const { url, ...item } = repository;

	const openInGithub = () => {
		Linking.openURL(url);
	};

	return (
		<View>
			<RepositoryItem item={item}/>
			<Pressable style={styles.githubLink} onPress={openInGithub}>
				<Text style={styles.githubLinkText}>Open in Github</Text>
			</Pressable>
		</View>
	);
};

export default RepositoryInfo;