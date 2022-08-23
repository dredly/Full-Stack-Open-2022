import { HealthCheckEntry, HealthCheckRating } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckDetails: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
	const heartColours = ['green', 'yellow', 'orange', 'red'];

	const heartStyle = (healthLevel: HealthCheckRating) => {
		return {
			color: heartColours[healthLevel]
		};
	};
	
	return (
		<>
			<FavoriteIcon style={heartStyle(entry.healthCheckRating)}/>
		</>
	);
};

export default HealthCheckDetails;