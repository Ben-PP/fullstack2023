import axios from 'axios';
import { Entry, NewEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllEntries = async () => {
  const response = await axios.get<Entry[]>(baseUrl);
  return response.data;
};

const addEntry = async (entry: NewEntry): Promise<Entry> => {
  const response = await axios.post<Entry>(baseUrl, entry);
  if (response.status !== 201) {
    throw new Error();
  }
  return response.data;
};

export default {
  getAllEntries,
  addEntry,
};
