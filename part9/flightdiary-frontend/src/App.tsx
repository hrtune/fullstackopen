import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from "./types";
import Diaries from "./components/Diaries";
import NewDiary from "./components/NewDiary";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  const submit = (diary: NewDiaryEntry) => {
    diaryService.addDiary(diary).then((data: DiaryEntry) => {
      console.log(data);
      const newDiary: NonSensitiveDiaryEntry = {
        id: data.id,
        date: data.date,
        visibility: data.visibility,
        weather: data.weather,
      };
      setDiaries(diaries.concat(newDiary));
    });
  };

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <NewDiary submit={submit} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
