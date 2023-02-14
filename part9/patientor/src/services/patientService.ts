import { Patient, PatientWithoutSsn } from "../types";
import patientData from "../data/patients";

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

export default {
  getAll,
  getAllWithoutSsn,
};
