import {
  Patient,
  PatientWithoutSsn,
  NewPatient,
  Entry,
  EntryWithoutId,
} from "../types";
import patientData from "../data/patients";
import { v1 as uuid } from "uuid";

const getAll = (): Patient[] => patientData;
const getAllWithoutSsn = (): PatientWithoutSsn[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
      };
    }
  );
};

const getById = (id: string): Patient => {
  const patient = patientData.find((p) => p.id === id);
  if (!patient) {
    throw new Error(`patient not found`);
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patientData.push(newPatient);

  console.log("added:", newPatient);

  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  const patient = patientData.find((p) => p.id === id);
  if (!patient) {
    throw new Error("no such patient: " + id);
  }

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getAll,
  getAllWithoutSsn,
  addPatient,
  getById,
  addEntry,
};
