import { Entry } from '../types';
interface DefaultProps {
  entries: Entry[];
}

const Entries = (props: DefaultProps) => {
  const { entries } = props;
  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          visibility: {entry.visibility} <br />
          weather: {entry.weather}
        </div>
      ))}
    </div>
  );
};

export default Entries;
