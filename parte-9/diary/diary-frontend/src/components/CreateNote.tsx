import type { SyntheticEvent } from "react";
import { useCreateDiarie } from "../hooks/useCreate";
import type { NewDiaryEntry } from "../types/types";

export const CreateNote = () => {
  const { createDiarie } = useCreateDiarie();
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const data = Object.fromEntries(new FormData(target)) as NewDiaryEntry;
    createDiarie.mutateAsync(data);
    target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Weather</legend>
        <div>
          <input type="radio" name="weather" value="sunny" />
          <label htmlFor="sunny">sunny</label>
        </div>
        <div>
          <input type="radio" name="weather" value="rainy" />
          <label htmlFor="rainy">rainy</label>
        </div>
        <div>
          <input type="radio" name="weather" value="cloudy" />
          <label htmlFor="cloudy">cloudy</label>
        </div>
        <div>
          <input type="radio" name="weather" value="stormy" />
          <label htmlFor="stormy">stormy</label>
        </div>
        <div>
          <input type="radio" name="weather" value="windy" />
          <label htmlFor="windy">windy</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Visibility</legend>
        <div>
          <input type="radio" name="visibility" value="poor" />
          <label htmlFor="poor">poor</label>
        </div>
        <div>
          <input type="radio" name="visibility" value="ok" />
          <label htmlFor="ok">ok</label>
        </div>
        <div>
          <input type="radio" name="visibility" value="good" />
          <label htmlFor="good">good</label>
        </div>
        <div>
          <input type="radio" name="visibility" value="great" />
          <label htmlFor="great">great</label>
        </div>
      </fieldset>

      <fieldset>
        <label htmlFor="date"></label>
        <input type="date" name="date" id="date" />
      </fieldset>

      <fieldset>
        <label htmlFor="comment">Comment</label>
        <input type="text" name="comment" />
      </fieldset>
      <button type="submit">Send</button>
    </form>
  );
};
