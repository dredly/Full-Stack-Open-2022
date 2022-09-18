import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { Link } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
	appbar: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.darkBackground,
		display: 'flex',
		flexDirection: 'row'
	},
	appbarText: {
		margin: theme.margins.medium,
		color: theme.colors.light,
	}
});

const AppBar = () => {
	const queryResult = useQuery(ME);

	const signOut = useSignOut();

	return (
		<View style={styles.appbar}>
			<ScrollView horizontal>
				<Link to="/">
					<Text fontSize="heading" style={styles.appbarText}>Repositories</Text>
				</Link>
				{queryResult.data 
					? queryResult.data.me 
						? 
						<>
							<Link to="/review">
								<Text fontSize="heading" style={styles.appbarText}>Create a review</Text>
							</Link>
							<Link to="/myreviews">
								<Text fontSize="heading" style={styles.appbarText}>My reviews</Text>
							</Link>
							<Pressable onPress={signOut}>
								<Text fontSize="heading" style={styles.appbarText}>Sign out</Text>
							</Pressable>
						</>
						: 
						<>
							<Link to="/signin">
								<Text fontSize="heading" style={styles.appbarText}>Sign in</Text>
							</Link>
							<Link to="/signup">
								<Text fontSize="heading" style={styles.appbarText}>Sign up</Text>
							</Link>
						</>
					: null
				}
			</ScrollView>
		</View>
	);
};

export default AppBar;