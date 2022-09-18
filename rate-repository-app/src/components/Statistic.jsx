import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	boldFont: {
		fontWeight: '700'
	},
});

export const formatLargeNumber = num => {
	if (num < 1000) {
		return num.toString();
	}
	return (num / 1000).toFixed(1) + 'k';
};

const Statistic = ({title, value}) => {
    
	return (
		<View>
			<Text style={styles.boldFont}>{title}</Text>
			<Text>{formatLargeNumber(value)}</Text>
		</View>
	);
};

export default Statistic;