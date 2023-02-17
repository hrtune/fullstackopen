import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from "./types";
import axios from "axios";
import Diaries from "./components/Diaries";
import NewDiary from "./components/NewDiary";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const submit = (diary: NewDiaryEntry) => {
    diaryService
      .addDiary(diary)
      .then((data: DiaryEntry) => {
        console.log(data);
        const newDiary: NonSensitiveDiaryEntry = {
          id: data.id,
          date: data.date,
          visibility: data.visibility,
          weather: data.weather,
        };
        setDiaries(diaries.concat(newDiary));
      })
      .catch((error) => {
        if (axios.isAxiosError<string>(error)) {
          console.log(error.status);
          console.error(error.response);
          if (error.response) {
            setErrorMessage(error.response.data);
            setTimeout(() => setErrorMessage(""), 5000);
          }
        } else {
          console.error(error);
        }
      });
  };

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <NewDiary submit={submit} errorMessage={errorMessage} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
