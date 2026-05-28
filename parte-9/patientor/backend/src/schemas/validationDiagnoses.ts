import { z } from "zod";

// 1. Base común para todas las entradas médicas
const BaseEntrySchema = z.object({
  date: z.string().min(1), // Valida formato YYYY-MM-DD
  specialist: z.string().min(1),
  description: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});

// 2. Esquemas específicos para cada tipo de entrada
const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().min(1),
    criteria: z.string().min(1),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1),
  sickLeave: z
    .object({
      startDate: z.string().min(1),
      endDate: z.string().min(1),
    })
    .optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.number().int().min(0).max(3), // Tipos de 0 a 3 en FSO
});

// 3. Unión discriminada para validar las entradas según su "type"
export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

// 4. Esquema principal para el Paciente
export const PatientSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  dateOfBirth: z.string().min(1),
  ssn: z.string().min(1),
  gender: z.enum(["male", "female", "other"]), // Valida que solo sean estos strings
  occupation: z.string().min(1),
  entries: z.array(EntrySchema), // Arreglo de la unión discriminada
});

// 5. Esquema por si necesitas validar la lista completa de pacientes
export const PatientListSchema = z.array(PatientSchema);
