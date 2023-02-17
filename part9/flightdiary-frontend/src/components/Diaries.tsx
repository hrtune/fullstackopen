import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry } from "../types";
import diaryService from "../services/diaryService";

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
    </div>
  );
};

const Diaries = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      setDiaries(data);
    });
  });
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <Diary key={d.id} diary={d} />
      ))}
    </div>
  );
};

export default Diaries;
