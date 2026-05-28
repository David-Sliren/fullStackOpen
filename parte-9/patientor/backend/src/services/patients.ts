import { patients } from "../data/patients.js";
import type {
  Entry,
  NewEntry,
  NonSensitivePatient,
  Patients,
  nonId,
  nonSSN,
} from "../types.js";

export const getPatients = (): nonSSN[] => {
  return patients.map(({ ssn, ...datarest }) => datarest);
};

export const createPatients = (body: nonId) => {
  const newPatient: Patients = {
    id: crypto.randomUUID(),
    ...body,
  };

  patients.push(newPatient);

  return body;
};

export const getPatientById = (id: string): NonSensitivePatient => {
  const patientFound = patients.find((pf) => pf.id === id);

  if (!patientFound) throw new Error("patient not found");

  return patientFound;
};

export const createDeagnosesPatient = (id: string, data: NewEntry) => {
  const patientFound = patients.find((pf) => pf.id === id);

  if (!patientFound) throw new Error("patient not found");

  const newEntry = {
    id: crypto.randomUUID(),
    ...data,
  };

  patientFound.entries.push(newEntry);
  return newEntry;
};
