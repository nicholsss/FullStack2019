import { Gender, Patient } from "./interfaces/Patient";
import { v1 as uuid } from 'uuid';
const id = uuid();
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing comment');
    }
    return name;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing comment');
    }
    return occupation;
};
const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);

    }
    return gender;
};


const AddNewPatient = (object: unknown): Patient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'occupation' in object && 'gender' in object) {
        const newPatient: Patient = {
            id: id,
            name: parseName(object.name),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender)
        };

        return newPatient;
    }
    throw new Error('Incorrect data: missing mandatory fields');
};
export default AddNewPatient;