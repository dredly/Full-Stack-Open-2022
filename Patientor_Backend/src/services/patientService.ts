import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { Patient, NonSensitivePatientData, NewPatient, NewEntry, Entry } from "../types";

const getAllNonSensitivePatientData = (): NonSensitivePatientData[] => {
	return patients.map(p => ({
		id: p.id,
		name: p.name,
		dateOfBirth: p.dateOfBirth,
		gender: p.gender,
		occupation: p.occupation,
		entries: p.entries
	}));
};

const addPatient = (patient: NewPatient): Patient => {
	const id: string = uuid();
	const newPatient = {
		id,
		...patient
	};
	patients.push(newPatient);
	return newPatient;
};

const findById = (id: string): Patient | undefined => {
	const patient = patients.find(p => p.id === id);
	return patient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
	const patient = patients.find(p => p.id === id);
	if (!patient) {
		throw new Error('Patient not found');
	}
	const entryId: string = uuid();
	const newEntry = {
		id: entryId,
		...entry
	};
	patient.entries = patient.entries.concat(newEntry);
	return newEntry;
};

export default {
	getAllNonSensitivePatientData, addPatient, findById, addEntry
};