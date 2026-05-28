export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
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
  sickLeave:
    | {
        startDate: string;
        endDate: string;
      }
    | undefined;
}

export type Entry = HealthCheckEntry | HospitalEntry | OcupationalEntry;
export type NewEntry =
  | Omit<HealthCheckEntry, "id">
  | Omit<HospitalEntry, "id">
  | Omit<OcupationalEntry, "id">;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
