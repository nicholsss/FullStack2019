import { Diagnose } from "../interfaces/Diagnose";
import diagnoseData from "../data/diagnoses";

const getDiagnoses = (): Array<Diagnose> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return diagnoseData;
};

export default {
    getDiagnoses
};