export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export type BaseEntryWithoutId = Omit<BaseEntry, "id" >;

export interface Discharge {
	date: string;
	criteria: string;
}

export interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: Discharge;
}

export interface SickLeave {
	startDate: string;
	endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export type EntryFormValuesHealthCheck = Omit<HealthCheckEntry, "id">;
export interface EntryFormValuesHospital extends BaseEntryWithoutId {
	dischargeDate: string;
	dischargeCriteria: string;
	type: "Hospital"
}
export interface EntryFormValuesOccupational extends BaseEntryWithoutId {
	employerName: string;
	isSickLeave: boolean;
	sickLeaveStartDate?: string;
	sickLeaveEndDate?: string;
	type: "OccupationalHealthcare"
}

export type EntryFormValues = 
	| EntryFormValuesHealthCheck
	| EntryFormValuesHospital
	| EntryFormValuesOccupational;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}