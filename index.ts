import express from 'express';
import qs from 'qs';

import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.set('query parser', (str: string) => 
  qs.parse(str)
);
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!isNotNumber(height) && !isNotNumber(weight)) {
      const result = calculateBmi(Number(height), Number(weight));
      res.json({
        height: Number(height),
        weight: Number(weight),
        bmi: result
      });
  } else {
    res.json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(dailyExercises, target);
  res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});