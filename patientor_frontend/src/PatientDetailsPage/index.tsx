import React from "react";
import { useParams} from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import PatientEntry from "./PatientEntry";
import AddEntryModal from "../AddEntryModal";

import { Button } from "@material-ui/core";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { EntryFormValues, NewEntry } from "../types";

const PatientDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	if (!id) {
		throw new Error("Missing or invalid id");
	}
	const [{ patient }, dispatch] = useStateValue();

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string>();
	const [selectedEntryType, setSelectedEntryType] = React.useState<Entry['type']>('HealthCheck');

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	React.useEffect(() => {
		const fetchPatient = async () => {
			try {
				const { data: patientFromApi } = await axios.get<Patient>(
					`${apiBaseUrl}/patients/${id}`
				);
				dispatch(updatePatient(patientFromApi));
			} catch (e) {
				console.error(e);
			}
		};
		if (!patient || patient.id !== id) {
			void fetchPatient();
		}
	}, [dispatch]);

	const openModal = (): void => setModalOpen(true);

	if (!patient) {
		return (
			<div>
				Loading
			</div>
		);
	}

	const submitNewEntry = async (values: EntryFormValues ) => {
		try {
			let newEntryData: NewEntry;
			switch (values.type) {
			case "HealthCheck":
				newEntryData = values;
				break;
			case "Hospital":
				newEntryData = { ...values, discharge: {
					date: values.dischargeDate,
					criteria: values.dischargeCriteria
				}};
				break;
			case "OccupationalHealthcare":
				if (values.sickLeaveStartDate && values.sickLeaveEndDate) {
					newEntryData = { ...values, sickLeave: {
						startDate: values.sickLeaveStartDate,
						endDate: values.sickLeaveEndDate
					}};
				} else {
					newEntryData = values;
				}
				break;
			}
			const {data: addedEntry} = await axios.post<Entry>(`${apiBaseUrl}/patients/${patient.id}/entries`,
				newEntryData
			);
			dispatch(updatePatient({...patient, entries: patient.entries.concat(addedEntry)}));
			closeModal();
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				console.error(e?.response?.data || "Unrecognized axios error");
				setError(String(e?.response?.data?.error) || "Unrecognized axios error");
			} else {
				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	};

	return (
		<div>
			<h3>{patient.name}</h3>
			{patient.gender === 'male'
				? <MaleIcon />
				: patient.gender === 'female'
					? <FemaleIcon />
					: <TransgenderIcon />
			}
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
			<h4>Entries</h4>
			{patient.entries.map(entry => (
				<PatientEntry key={entry.id} entry={entry}/>
			))}
			<AddEntryModal
				modalOpen={modalOpen}
				error={error}
				onSubmit={submitNewEntry}
				onClose={closeModal}
				entryType={selectedEntryType}
			/>
			<Button onClick={() => openModal()}>Add new entry</Button>
			<h5>Change entry type</h5>
			<select value={selectedEntryType} onChange={({target}) => setSelectedEntryType(target.value as Entry['type'])}>
				<option value="HealthCheck">Health Check</option>
				<option value="Hospital">Hospital</option>
				<option value="OccupationalHealthcare">Occupational Healthcare</option>
			</select>
		</div>
	);
};


export default PatientDetailsPage;
