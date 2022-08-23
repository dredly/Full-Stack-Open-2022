import { OccupationalHealthcareEntry } from "../../types";
import EventBusyIcon from '@mui/icons-material/EventBusy';

const OccupationalHealthcareDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
	return (
		<>
			<p>Employer: {entry.employerName}</p>
			{entry.sickLeave
				? <>
					<details>
						<summary>Sick leave <EventBusyIcon /></summary>
						{entry.sickLeave.startDate} - {entry.sickLeave.startDate}
					</details>
				</>
				: null
			}
		</>
	);
};

export default OccupationalHealthcareDetails;