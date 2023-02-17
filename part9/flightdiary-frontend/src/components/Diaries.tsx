import { NonSensitiveDiaryEntry } from "../types";

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
    </div>
  );
};

const Diaries = ({ diaries }: { diaries: NonSensitiveDiaryEntry[] }) => {
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
