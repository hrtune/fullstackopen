import diagnosesData from "../data/diagnoses";
import { Diagnosis } from "../types";

const getAll = (): Diagnosis[] => diagnosesData;

export default {
  getAll,
};
