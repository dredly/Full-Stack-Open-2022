import { Entry } from "../types";
import { useStateValue } from "../state";
import EntryDetails from "./EntryDetails";


const PatientEntry = ({entry}: {entry: Entry}) => {
	const [{diagnoses}] = useStateValue();
	const relevantDiagnoses = diagnoses.filter(d => entry.diagnosisCodes?.includes(d.code));

	const descriptionStyle = {
		fontStyle: 'italic'
	};

	const entryStyle = {
		border: '2px solid blue',
		padding: '1rem',
		margin: '0.2rem'
	};

	console.log('relevantDiagnoses', relevantDiagnoses);

	return (
		<div style={entryStyle}>
			<p>
				{entry.date} <span style={descriptionStyle}>{entry.description}</span>
			</p>
			{relevantDiagnoses
				? <ul>
					{relevantDiagnoses.map(rd => (
						<li key={rd.code}>{rd.code} {rd.name}</li>
					))}
				</ul> 
				: null
			}
			<EntryDetails entry={entry}/>
			<p>Specialist: {entry.specialist}</p>
		</div>
	);
};

export default PatientEntry;