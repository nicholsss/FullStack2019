import express from 'express';
import patientService from '../services/patientService';
import AddNewPatient from '../utils';
import { v1 as uuid } from 'uuid';
const id = uuid();

console.log(id);
const router = express.Router();

router.get('/', (_req, res) => {
  return res.send(patientService.getSNNPatientInfo());

});

router.post('/', (req, res ) => {
  try {
    const newPatient = AddNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error', error.message;
    }
    res.status(400).send('fuked'+errorMessage);
  }
});

export default router;