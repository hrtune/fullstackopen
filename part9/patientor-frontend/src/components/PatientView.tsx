import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from "../services/patients";
const PatientView = ({ patients }: { patients: Patient[] }) => {
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

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>gender: {patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientView;
