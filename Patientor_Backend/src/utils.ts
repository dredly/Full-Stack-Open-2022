import diagnoses from '../data/diagnoses';
import { NewPatient, Gender, EntryType, NewEntry, Diagnosis, Discharge, SickLeave, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name');
	}
	return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
	if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
		throw new Error('Incorrect or missing date ' + dateOfBirth);
	}
	return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}
	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender|| !isGender(gender)) {
		throw new Error('Incorrect or missing gender');
	}
	return gender;
}; 

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}
	return occupation;
};
 
type PatientFields = {
	name: unknown, 
	dateOfBirth: unknown, 
	ssn: unknown, 
	gender: unknown, 
	occupation: unknown
};

export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: PatientFields): NewPatient => {
	const newPatient: NewPatient = {
		name: parseName(name),
		dateOfBirth: parseDateOfBirth(dateOfBirth),
		ssn: parseSsn(ssn),
		gender: parseGender(gender),
		occupation: parseOccupation(occupation),
		entries: []
	};
	return newPatient;
};

// --------------- Entry Related stuff -----------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(EntryType).includes(param);
};

const parseEntryType = (type: unknown): EntryType => {
	if (!type|| !isEntryType(type)) {
		throw new Error('Incorrect or missing entry type');
	}
	return type;
}; 

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description');
	}
	return description;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date ' + date);
	}
	return date;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist');
	}
	return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosisCode = (param: any): param is Diagnosis['code'] => {
	const allCodes = diagnoses.map(d => d.code);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return allCodes.includes(param);
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> | undefined => {
	if (!diagnosisCodes) return;
	if (!(diagnosisCodes instanceof Array)) {
		throw new Error('Diagnosis codes must be an array');
	}
	// Check that all entries in the array are diagnosis codes
	if (diagnosisCodes.filter(dc => isDiagnosisCode(dc)).length !== diagnosisCodes.length) {
		throw new Error('Not all elements in the array are diagnosis codes');
	}
	return diagnosisCodes as Array<Diagnosis['code']>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
	if (!param.date || !param.criteria) {
		return false;
	}
	if (!isString(param.criteria)) {
		return false;
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	if (!isString(param.date) || !isDate(param.date)) {
		return false;
	}
	return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
	if (!discharge|| !isDischarge(discharge)) {
		throw new Error('Incorrect or missing discharge');
	}
	return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
	if (!employerName || !isString(employerName)) {
		throw new Error('Incorrect or missing employerName');
	}
	return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
	if (!param.startDate || !param.endDate) {
		return false;
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	if (!isDate(param.startDate) || !isDate(param.endDate)) {
		return false;
	}
	return true;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
	if (!sickLeave) return;
	if (!isSickLeave(sickLeave)) {
		throw new Error('Incorrectsick leave');
	}
	return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
	if (!isHealthCheckRating(healthCheckRating)) {
		throw new Error('Incorrect or missing healthCheckRating');
	}
	return healthCheckRating;
};

type EntryFields = {
	description: unknown,
	date: unknown,
	specialist: unknown,
	diagnosisCodes: unknown,
	type: unknown,
	discharge: unknown,
	employerName: unknown,
	sickLeave: unknown,
	healthCheckRating: unknown,
};

export const toNewHospitalEntry = ({
	description, date, specialist, diagnosisCodes, type, discharge, employerName, sickLeave, healthCheckRating
}: EntryFields): NewEntry => {
	const newEntryType = parseEntryType(type);
	const baseEntryData = {
		description: parseDescription(description),
		date: parseDate(date),
		specialist: parseSpecialist(specialist),
		diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
	};
	switch (newEntryType) {
		case "Hospital":
			const hospitalSpecificData = {
				discharge: parseDischarge(discharge),
				type: newEntryType
			};
			return { ...baseEntryData, ...hospitalSpecificData };
		case "OccupationalHealthcare":
			const occupationalHealthcareSpecificData = {
				employerName: parseEmployerName(employerName),
				sickLeave: parseSickLeave(sickLeave),
				type: newEntryType
			};
			return { ...baseEntryData, ...occupationalHealthcareSpecificData};
		case "HealthCheck":
			const healthCheckSpecificData = {
				healthCheckRating: parseHealthCheckRating(healthCheckRating),
				type: newEntryType
			};
			return { ...baseEntryData, ...healthCheckSpecificData};
		default:
			throw new Error('Invalid entry type');
	}
};