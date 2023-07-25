import { Gender, Patient } from "./interfaces/Patient";
import { v1 as uuid } from 'uuid';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };
  
  const parseName = (name: unknown): string => {
    if (!isString(name) || name.trim() === "") {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };
  
  const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation) || occupation.trim() === "") {
      throw new Error('Incorrect or missing occupation');
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


const AddNewPatient = (object: Partial<Patient>): Patient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'occupation' in object && 'gender' in object) {
        const newPatient: Patient = {
            id: uuid(),
            name: parseName(object.name),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender),
            ssn: object.ssn,
            dateOfBirth: object.dateOfBirth,
        };

        return newPatient;
    }
    throw new Error('Incorrect data: missing mandatory fields');
};
export default AddNewPatient;