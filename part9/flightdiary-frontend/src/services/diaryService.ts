import axios from "axios";
import { AxiosResponse } from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

const getAllDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then((response) => response.data);
};

const addDiary = (diary: NewDiaryEntry) => {
  return axios
    .post<NewDiaryEntry, AxiosResponse<DiaryEntry>>(baseUrl, diary)
    .then((res) => res.data);
};

export default {
  getAllDiaries,
  addDiary,
};
