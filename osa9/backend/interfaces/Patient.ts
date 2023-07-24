export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: string;
    ssn?: string;
    dateOfBirth?: string;
  }

export type NoSSNPatientData = Omit<Patient, "ssn">;