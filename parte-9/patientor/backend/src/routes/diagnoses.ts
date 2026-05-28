import express, { type Router } from "express";
import { getDiagnoses } from "../services/diagnoses.js";

export const routerDiagnoses: Router = express.Router();

routerDiagnoses.get("/", (_req, res) => {
  return res.json(getDiagnoses());
});
