import express from 'express';
import calculateBmi from './calculators/bmiCalculator';

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
