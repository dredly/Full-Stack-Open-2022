import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import theme from '../theme';
import Statistic from './Statistic';

const styles = StyleSheet.create({
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 5,
		marginRight: 10
	},
	boldFont: {
		fontWeight: '700'
	},
	horizontalLayout: {
		display: 'flex',
		flexDirection: 'row',
	},
	repository: {
		padding: 8,
	},
	language: {
		backgroundColor: theme.colors.primary,
		padding: 4,
		borderRadius: 4,
		alignSelf: 'flex-start'
	},
	languageText: {
		color: theme.colors.light
	},
	aroundSpacing: {
		justifyContent: 'space-around'
	},
	nameAndLang: {
		display: 'flex',
		flexShrink: 1,
	}
});

const RepositoryItem = ({item}) => {
	return (
		<View testID="repositoryItem" style={styles.repository}>
			<View style={styles.horizontalLayout}>
				<Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }}/>
				<View style={styles.nameAndLang}>
					<Text style={styles.boldFont}>{item.fullName}</Text>
					<Text>{item.description}</Text>
					<TouchableHighlight>
						<View style={styles.language}>
							<Text style={styles.languageText}>{item.language}</Text>
						</View>
					</TouchableHighlight>
				</View>
			</View>
			<View style={[styles.horizontalLayout, styles.aroundSpacing]}>
				<Statistic title='Stars' value={item.stargazersCount}/>
				<Statistic title='Forks' value={item.forksCount}/>
				<Statistic title='Reviews' value={item.reviewCount}/>
				<Statistic title='Rating' value={item.ratingAverage}/>
			</View>
		</View>
	);
};

export default RepositoryItem;