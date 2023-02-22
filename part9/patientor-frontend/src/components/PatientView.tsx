import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnosis } from "../types";
import patientService from "../services/patients";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red, yellow, green } from "@mui/material/colors";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import NewHealthCheckEntry from "./NewHealthCheckEntry";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";

const PatientView = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("success");
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    if (!id) {
      return;
    }
    patientService.getById(id).then((data) => setPatient(data));
  });

  if (!id || !patient) {
    return <h2>404 Not Found</h2>;
  }

  const addEntry = (entry: Entry): void => {
    const newPatient: Patient = {
      ...patient,
      entries: patient.entries.concat(entry),
    };
    setPatient(newPatient);
  };

  const setAlert = (
    severity: AlertColor,
    message: string,
    timeout: number = 3000
  ): void => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, timeout);
  };

  const DiagnosisListItem = ({ code }: { code: string }) => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    if (!diagnosis) {
      return null;
    }
    return (
      <li>
        {code} {diagnosis.name}
      </li>
    );
  };

  const EntryView = ({ entry }: { entry: Entry }) => {
    const borderStyle = {
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "5px",
      margin: "5px",
    };

    const assertNever = (value: never) => {
      return null;
    };

    const TypeIcon = () => {
      switch (entry.type) {
        case "HealthCheck":
          return <MedicalServicesIcon />;
        case "Hospital":
          return <LocalHospitalIcon />;
        case "OccupationalHealthcare":
          return <WorkIcon />;
        default:
          return assertNever(entry);
      }
    };
    const RatingIcon = () => {
      if (entry.type !== "HealthCheck") {
        return null;
      }
      const color = () => {
        switch (entry.healthCheckRating) {
          case 0:
            return green[500];
          case 1:
            return yellow[500];
          case 2:
            return red[400];
          case 3:
            return red["A700"];
        }
      };

      return <FavoriteIcon htmlColor={color()} />;
    };

    const Employer = () => {
      if (entry.type !== "OccupationalHealthcare") {
        return null;
      }

      return <em>{entry.employerName}</em>;
    };

    return (
      <div style={borderStyle}>
        <div>
          {entry.date} <TypeIcon /> <Employer />
        </div>
        <div>
          <em>{entry.description}</em>
        </div>
        <RatingIcon />
        <div>diagnose by {entry.specialist}</div>
        {entry.diagnosisCodes ? (
          <ul>
            {entry.diagnosisCodes.map((dc) => (
              <DiagnosisListItem code={dc} key={dc} />
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    );
  };

  const Entries = () => {
    const entries: Entry[] = patient.entries;

    if (!entries.length) {
      return (
        <div>
          <h3>no entries</h3>
        </div>
      );
    }

    return (
      <div>
        <h3>entries</h3>
        {entries.map((e) => (
          <EntryView entry={e} key={e.id} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>gender: {patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
      <NewHealthCheckEntry id={id} addEntry={addEntry} setAlert={setAlert} />
      <Entries />
    </div>
  );
};

export default PatientView;
