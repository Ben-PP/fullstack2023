import express from 'express';
import calculateBmi from './calculators/bmiCalculator';
import calculateExercises from './calculators/exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }
  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((h: number) => !isNaN(h))
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }
  const result = calculateExercises(
    Number(target),
    daily_exercises as number[]
  );
  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
