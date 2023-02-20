import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const baseUrl = `${apiBaseUrl}/diagnoses`;

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(baseUrl);
  return data;
};

const add = async (object: Diagnosis) => {
  const { data } = await axios.post<Diagnosis>(baseUrl, object);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  add,
};
