import express from 'express';
import patientService from "../services/patientService";
import {toNewPatient, toNewHospitalEntry} from '../utils';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const newEntry = toNewHospitalEntry(req.body);
		const patientId = req.params.id.toString();
		const patient = patientService.findById(patientId);
		if (patient) {
			const addedEntry = patientService.addEntry(patientId, newEntry);
			res.json(addedEntry);
		} else {
			res.sendStatus(404);
		}
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong';
		if (error instanceof Error) {
			errorMessage += ' Error ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.get('/:id', (req, res) => {
	const patient = patientService.findById(req.params.id.toString());
	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

router.get('/', ((_req, res) => {
	res.send(patientService.getAllNonSensitivePatientData());
}));

router.post('/', (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong';
		if (error instanceof Error) {
			errorMessage += ' Error ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;