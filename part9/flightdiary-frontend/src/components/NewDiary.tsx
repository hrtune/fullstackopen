import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

const ErrorMessage = ({ message }: { message: string }) => {
  const style = {
    color: "red",
  };
  return <div style={style}>{message}</div>;
};

const NewDiary = ({
  submit,
  errorMessage,
}: {
  submit: (diary: NewDiaryEntry) => void;
  errorMessage: string;
}) => {
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
      <ErrorMessage message={errorMessage} />
      <form onSubmit={addDiary}>
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          visibility:{" "}
          {Object.values(Visibility).map((v) => (
            <span key={v}>
              <input
                type="radio"
                id={v}
                name="visibility"
                onChange={() => setVisibility(v)}
                checked={visibility === v}
              />
              {v}{" "}
            </span>
          ))}
        </div>
        <div>
          weather:{" "}
          {Object.values(Weather).map((v) => (
            <span key={v}>
              <input
                type="radio"
                id={v}
                name="weather"
                onChange={() => setWeather(v)}
                checked={weather === v}
              />
              {v}{" "}
            </span>
          ))}
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
