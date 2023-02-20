import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnosis } from "../types";
import patientService from "../services/patients";
const PatientView = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    patientService.getById(id).then((data) => setPatient(data));
  });

  if (!patient) {
    return <h2>404 Not Found</h2>;
  }

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
    return (
      <div>
        <p>
          {entry.date} <em>{entry.description}</em>
        </p>
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
      <Entries />
    </div>
  );
};

export default PatientView;
