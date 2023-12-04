export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export type Visibility = 'great' | 'good' | 'moderate' | 'poor';

export interface Entry {
  id: number;
  date: string;
  visibility: Visibility;
  comment: string;
  weather: Weather;
}

export type NewEntry = Omit<Entry, 'id'>;
