import express from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: NonSensitivePatient[] =
    patientService.getNonSensitivePatients();
  res.send(patients);
});

export default router;
