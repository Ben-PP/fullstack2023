import { useEffect, useState } from 'react';
import entryService from './services/entryService';
import NewEntry from './components/NewEntry';
import Entries from './components/Entries';
import Notification from './components/Notification';
import { Entry, NewEntry as NewEntryType } from './types';
import { AxiosError } from 'axios';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [message, setMessage] = useState<string | null>();

  useEffect(() => {
    entryService.getAllEntries().then((newEntries) => setEntries(newEntries));
  }, []);

  const addEntry = async (entry: NewEntryType): Promise<void> => {
    try {
      const newEntry = await entryService.addEntry(entry);
      setEntries(entries.concat(newEntry));
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setMessage(e.response.data);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  };

  return (
    <div>
      {message ?? <Notification message={message!} />}
      <NewEntry onSubmit={addEntry} />
      <Entries entries={entries} />
    </div>
  );
}

export default App;
