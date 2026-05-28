import { Card, Typography } from "@mui/material";
import { LocalHospital, Work } from "@mui/icons-material";
import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Map<string, Diagnosis>;
}

export const Entries = ({ entry, diagnoses }: Props) => {
  return (
    <Card
      variant="elevation"
      sx={{
        border: "2px solid",
        padding: "2em",
        borderRadius: "2em",
        margin: "1em 0",
      }}
      key={entry.id}
    >
      <Typography
        gutterBottom
        sx={{
          color: "text.secondary",
          fontSize: 14,
          display: "flex",
          gap: "1em",
        }}
      >
        {entry.date}
        <span>{entry.type === "Hospital" ? <LocalHospital /> : <Work />}</span>
        {entry.type === "OccupationalHealthcare" && (
          <span>{entry.employerName}</span>
        )}
      </Typography>
      <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        {entry.description}
      </Typography>

      {entry.type === "OccupationalHealthcare" && entry.sickLeave && (
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          sick level: {entry.sickLeave?.startDate} : {entry.sickLeave?.endDate}
        </Typography>
      )}
      <Typography
        gutterBottom
        sx={{ color: "text.secondary", fontSize: 14, margin: "1em 0" }}
      >
        diagnose by {entry.specialist}
      </Typography>
      {entry.diagnosisCodes?.map((code, i) => (
        <Typography
          key={i + 1}
          gutterBottom
          sx={{ color: "text.secondary", fontSize: 14, fontWeight: 600 }}
        >
          {code} <span>{diagnoses.get(code)?.name}</span>
        </Typography>
      ))}
    </Card>
  );
};
