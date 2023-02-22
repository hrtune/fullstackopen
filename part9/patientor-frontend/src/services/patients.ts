import axios from "axios";
import { AxiosResponse } from "axios";
import { Patient, PatientFormValues, EntryWithoutId, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const baseUrl = `${apiBaseUrl}/patients`;

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(baseUrl);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${baseUrl}/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(baseUrl, object);

  return data;
};

const addEntry = async (id: string, entry: EntryWithoutId) => {
  const { data } = await axios.post<EntryWithoutId, AxiosResponse<Entry>>(
    `${baseUrl}/${id}/entries`,
    entry
  );
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getById,
  addEntry,
};
