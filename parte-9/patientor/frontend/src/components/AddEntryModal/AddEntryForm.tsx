import { useState, SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material";
import { Diagnosis, NewEntry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Map<string, Diagnosis>;
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState("0");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      date,
      specialist,
      description,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    let entry: NewEntry;

    switch (entryType) {
      case "HealthCheck":
        entry = {
          type: "HealthCheck",
          healthCheckRating: parseInt(healthCheckRating),
          ...baseEntry,
        };
        break;
      case "Hospital":
        entry = {
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
          ...baseEntry,
        };
        break;
      case "OccupationalHealthcare":
        entry = {
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                }
              : undefined,
          ...baseEntry,
        };
        break;
      default:
        return;
    }

    onSubmit(entry);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <Box sx={{ mb: 2 }}>
          <InputLabel sx={{ mb: 1 }}>Entry Type</InputLabel>
          <Select
            fullWidth
            value={entryType}
            onChange={(e) => setEntryType(e.target.value as EntryType)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
          </Select>
        </Box>

        {/* Common Fields */}
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 2 }}>
          <InputLabel sx={{ mb: 1 }}>Diagnosis Codes (optional)</InputLabel>
          <Select
            multiple
            fullWidth
            value={diagnosisCodes}
            onChange={handleDiagnosisChange}
          >
            {Array.from(diagnoses.entries()).map(([code, diagnosis]) => (
              <MenuItem key={code} value={code}>
                {code} - {diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* HealthCheck specific */}
        {entryType === "HealthCheck" && (
          <Box sx={{ mb: 2, p: 2, bgcolor: "info.light", borderRadius: 1 }}>
            <InputLabel sx={{ mb: 1 }}>Health Check Rating</InputLabel>
            <Select
              fullWidth
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
            >
              <MenuItem value="0">0 - Healthy</MenuItem>
              <MenuItem value="1">1 - At Risk</MenuItem>
              <MenuItem value="2">2 - Ill</MenuItem>
              <MenuItem value="3">3 - Critical</MenuItem>
            </Select>
          </Box>
        )}

        {/* Hospital specific */}
        {entryType === "Hospital" && (
          <Box sx={{ mb: 2, p: 2, bgcolor: "warning.light", borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Discharge Information
            </Typography>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              sx={{ mb: 1 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              multiline
              rows={2}
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </Box>
        )}

        {/* OccupationalHealthcare specific */}
        {entryType === "OccupationalHealthcare" && (
          <Box sx={{ mb: 2, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Sick Leave (optional)
            </Typography>
            <TextField
              label="Sick Leave Start Date"
              type="date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              sx={{ mb: 1 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Sick Leave End Date"
              type="date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        )}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth type="submit" variant="contained">
              Add Entry
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
