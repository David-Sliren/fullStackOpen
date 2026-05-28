import type { NonSensitiveDiaryEntry } from "../types/types";

export const Note = ({ date, visibility, weather }: NonSensitiveDiaryEntry) => {
  return (
    <div>
      <h1>{date}</h1>
      <p>{weather}</p>
      <p>{visibility}</p>
    </div>
  );
};
