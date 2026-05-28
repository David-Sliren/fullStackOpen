import express, { type Router } from "express";
import {
  createDeagnosesPatient,
  createPatients,
  getPatientById,
  getPatients,
} from "../services/patients.js";
import { toNewPatients } from "../../utils/validations.js";
import { EntrySchema } from "../schemas/validationDiagnoses.js";

export const routerPatients: Router = express.Router();

routerPatients.get("/", (_req, res) => {
  return res.status(200).json(getPatients());
});

routerPatients.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "patient not found 2" });
  try {
    const patientFound = getPatientById(id);

    res.status(201).json(patientFound);
  } catch (error: unknown) {
    let errorMessage = "bad request ";

    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

routerPatients.post("/", (req, res) => {
  try {
    const newPatient = toNewPatients(req.body);
    const data = createPatients(newPatient);
    res.status(200).json(data);
  } catch (error: unknown) {
    let errorMessage = "Someting went wrong";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

routerPatients.post("/:id/entries", (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ error: "bad request patient no found" });

  const result = EntrySchema.safeParse(req.body);

  if (!result.success)
    return res.status(400).json({
      error: result.error.issues.map((e) => ({
        message: `${e.path} ${e.message}`,
      })),
    });

  try {
    const data = createDeagnosesPatient(id, result.data);
    res.status(200).json(data);
  } catch (error: unknown) {
    let errorMessage = "Someting went wrong";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});
