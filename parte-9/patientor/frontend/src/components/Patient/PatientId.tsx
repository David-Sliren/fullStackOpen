import {
  Button,
  CardContent,
  Container,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Diagnosis, Patient, Entry, NewEntry } from "../../types";
import axios from "../../services/patients";
import { getDaignosesApi } from "../../services/diagnoses";
import { Entries } from "./Entries";
import { alwaysError } from "../../utils/neversType";
import AddEntryModal from "../AddEntryModal";

export const PatientId = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const { id } = useParams();
  const [diagnoses, setDiagnoses] = useState<Map<string, Diagnosis>>(new Map());
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) return;
    const fechApi = async () => {
      try {
        const dataPatients = await axios.getById(id);
        const dataDiagnoses = await getDaignosesApi();

        setDiagnoses(
          new Map<string, Diagnosis>(
            (dataDiagnoses ?? []).map((dg) => [dg.code, dg]),
          ),
        );
        setPatient(dataPatients);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          throw error.message;
        }
      }
    };

    fechApi();
  }, [id]);

  const submitNewEntry = async (values: NewEntry) => {
    try {
      if (!id || !patient) return;
      const newEntry = (await axios.addEntry(id, values)) as Entry;
      setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
      setModalOpen(false);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (!patient) return null;

  return (
    <Container>
      <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
        Patientor
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => setModalOpen(true)}
        >
          Add Entry
        </Button>
      </Box>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setError("");
        }}
        onSubmit={submitNewEntry}
        error={error}
        diagnoses={diagnoses}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {patient.name}
        </Typography>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Ocupation: {patient.occupation}
        </Typography>
        <Typography gutterBottom sx={{ color: "text.secondary", mb: 1.5 }}>
          Gener: {patient.gender}
        </Typography>
        <Typography variant="body2">
          Date Of birth: {patient.dateOfBirth}
        </Typography>

        <Typography variant="body2"> SSD: {patient.ssn}</Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h6" component="div">
          Entry
        </Typography>
        {patient.entries.map((pf) => {
          switch (pf.type) {
            case "HealthCheck":
              return <Entries key={pf.id} entry={pf} diagnoses={diagnoses} />;
            case "Hospital":
              return <Entries key={pf.id} entry={pf} diagnoses={diagnoses} />;
            case "OccupationalHealthcare":
              return <Entries key={pf.id} entry={pf} diagnoses={diagnoses} />;
            default:
              return alwaysError(pf);
          }
        })}
      </CardContent>
    </Container>
  );
};
