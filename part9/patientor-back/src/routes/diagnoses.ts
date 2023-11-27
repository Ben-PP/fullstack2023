import express from 'express';
import diagnosesService from '../services/diagnoseService';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses: Diagnosis[] = diagnosesService.getDiagnoses();
  res.json(diagnoses);
});

export default router;
