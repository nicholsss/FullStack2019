import { Diagnose } from "../interfaces/Diagnose";
import patientData from "../data/diagnoses";

const getPatients = (): Array<Diagnose> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return patientData;
};

export default {
    getPatients
};