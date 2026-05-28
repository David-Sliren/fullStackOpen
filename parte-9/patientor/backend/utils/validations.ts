import { Genere, type nonId } from "../src/types.js";

const isString = (param: unknown): param is string => {
  return typeof param === "string";
};

const isGenere = (param: string): param is Genere => {
  return Object.values(Genere)
    .map((e) => e.toString())
    .includes(param);
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const toParseDate = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) {
    throw new Error(`Incorrect missing value: ${param}`);
  }

  return param;
};

const toParseName = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error(`Incorrect missing value: ${param}`);
  }

  return param;
};

const toParseSsd = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error(`Incorrect missing value: ${param}`);
  }

  return param;
};

const toParseOccupation = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error(`Incorrect missing value: ${param}`);
  }

  return param;
};

const toParseGenere = (param: unknown): Genere => {
  if (!isString(param) || !isGenere(param)) {
    throw new Error(`Incorrect missing value: ${param}`);
  }

  return param;
};

export const toNewPatients = (object: unknown): nonId => {
  if (!object || typeof object !== "object") {
    throw new Error("Entry Failed");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: nonId = {
      name: toParseName(object.name),
      dateOfBirth: toParseDate(object.dateOfBirth),
      ssn: toParseSsd(object.ssn),
      gender: toParseGenere(object.gender),
      occupation: toParseOccupation(object.occupation),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};
