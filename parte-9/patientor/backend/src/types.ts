import type { Request } from "express";

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

interface BasicEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: string[] | undefined;
}

interface HealthCheckEntry extends BasicEntry {
  type: "HealthCheck";
  healthCheckRating: number;
}

interface HospitalEntry extends BasicEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OcupationalEntry extends BasicEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  } | undefined;
}

export type Entry =
  | BasicEntry
  | HealthCheckEntry
  | HospitalEntry
  | OcupationalEntry;

  export type NewEntry = Omit<HealthCheckEntry, 'id'> | Omit<HospitalEntry, 'id'> | Omit<OcupationalEntry, 'id'> 

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: "male" | "female" | "other";
  occupation: string;
  entries: Entry[];
}

export type nonSSN = Omit<Patients, "ssn">;
export type nonId = Omit<Patients, "id">;
export type NonSensitivePatient = Omit<Patients, "ssn" | "entries">;

export enum Genere {
  Male = "male",
  Female = "female",
  Other = "other",
}
