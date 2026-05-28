import { diagnoses } from "../data/diagnoses.js";
import type { Diagnoses } from "../types.js";

export const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};
