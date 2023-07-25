import { Diagnose } from "../interfaces/Diagnose";
import diagnoseData from "../data/diagnoses";

const getDiagnoses = (): Array<Diagnose> => {
    
    return diagnoseData;
};

export default {
    getDiagnoses
};