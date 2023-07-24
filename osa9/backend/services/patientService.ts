import { NoSSNPatientData } from "../interfaces/Patient";
import patientData from "../data/patients";

const getSNNPatientInfo = (): NoSSNPatientData[] => {
    // Create a new array without the 'ssn' property
    return patientData.map(({ ssn:_ssn, ...rest }) => rest);
  };

export default {
    getSNNPatientInfo
};