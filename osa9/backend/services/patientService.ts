import { Patient } from "../interfaces/Patient";
import patientData from "../data/patients";

const patients: Patient[] = patientData;
const getSNNPatientInfo = (): Patient[] => {
    // Create a new array without the 'ssn' property
    return patients.map(({ ssn:_ssn, ...rest }) => rest);
  };

const addPatient = (newPatient: Patient): Patient => {

  patients.push(newPatient);
  return newPatient;
};
export default {
    addPatient,
    getSNNPatientInfo
};