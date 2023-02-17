import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

const NewDiary = ({ submit }: { submit: (diary: NewDiaryEntry) => void }) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };

    submit(newDiary);

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          date: <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility:{" "}
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          weather:{" "}
          <input value={weather} onChange={(e) => setWeather(e.target.value)} />
        </div>
        <div>
          comment:{" "}
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default NewDiary;
