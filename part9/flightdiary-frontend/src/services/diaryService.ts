import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

const getAllDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then((response) => response.data);
};

export default {
  getAllDiaries,
};
