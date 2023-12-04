import { NewEntry as NewEntryType, Weather, Visibility } from '../types';
import { useField } from '../hooks';
import { useState } from 'react';

type NewEntryProps = {
  onSubmit: (entry: NewEntryType) => void;
};

const NewEntry = (props: NewEntryProps) => {
  const { onSubmit } = props;

  const date = useField('date');
  const [visibility, setVisibility] = useState<Visibility>(
    'great' as Visibility
  );
  const [weather, setWeather] = useState<Weather>('sunny' as Weather);
  const comment = useField('text');

  const visibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  };

  const weatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  };

  return (
    <div>
      <h2>New entry</h2>
      <form
        onSubmit={(event: React.SyntheticEvent) => {
          event.preventDefault();
          onSubmit({
            date: date.value,
            visibility: visibility,
            weather: weather,
            comment: comment.value,
          });
        }}
      >
        date: <input {...date} /> <br />
        visibility:
        <input
          type="radio"
          name="visibility"
          value={'great'}
          onChange={visibilityChange}
          defaultChecked
        />
        <label>great</label>
        <input
          type="radio"
          name="visibility"
          value={'good'}
          onChange={visibilityChange}
        />
        <label>good</label>
        <input
          type="radio"
          name="visibility"
          value={'ok'}
          onChange={visibilityChange}
        />
        <label>ok</label>
        <input
          type="radio"
          name="visibility"
          value={'poor'}
          onChange={visibilityChange}
        />
        <label>poor</label>
        <br />
        weather:
        <input
          type="radio"
          name="weather"
          value={'sunny'}
          onChange={weatherChange}
          defaultChecked
        />
        <label>sunny</label>
        <input
          type="radio"
          name="weather"
          value={'rainy'}
          onChange={weatherChange}
        />
        <label>rainy</label>
        <input
          type="radio"
          name="weather"
          value={'cloudy'}
          onChange={weatherChange}
        />
        <label>cloudy</label>
        <input
          type="radio"
          name="weather"
          value={'windy'}
          onChange={weatherChange}
        />
        <label>windy</label>
        <input
          type="radio"
          name="weather"
          value={'stormy'}
          onChange={weatherChange}
        />
        <label>stormy</label>
        <br />
        comment: <input {...comment} />
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NewEntry;
