import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: NonSensitivePatient[] =
    patientService.getNonSensitivePatients();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong';
    if (e instanceof Error) {
      errorMessage = `Error: ${e.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
