import { Patient, PatientWithoutSsn, NewPatient } from "../types";
import patientData from "../data/patients";
import { v1 as uuid } from "uuid";

const getAll = (): Patient[] => patientData;
const getAllWithoutSsn = (): PatientWithoutSsn[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
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

export default {
  getAll,
  getAllWithoutSsn,
  addPatient,
};
