import express from "express";
import cors from "cors";
import { routerDiagnoses } from "./routes/diagnoses.js";
import { routerPatients } from "./routes/patients.js";
import morgan from "morgan";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.get("/api/ping", (_req, res) => {
  res.send("Hello from ping");
});

app.use("/api/diagnoses", routerDiagnoses);
app.use("/api/patients", routerPatients);

app.listen(PORT, () => console.log(`Server in port ${PORT}`));
