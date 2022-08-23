import { HospitalEntry } from "../../types";

const HospitalDetails: React.FC<{entry: HospitalEntry}> = ({entry}) => {
	return (
		<>
			<p>Discharge date: <strong>{entry.discharge.date}</strong></p>
			<p>Criteria: {entry.discharge.criteria}</p>
		</>
	);
};

export default HospitalDetails;