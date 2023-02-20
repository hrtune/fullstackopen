import diagnosesData from "../data/diagnoses";
import { Diagnosis } from "../types";

const getAll = (): Diagnosis[] => diagnosesData;
const add = (diagnosis: Diagnosis): void => {
  diagnosesData.push(diagnosis);
};

export default {
  getAll,
  add,
};
