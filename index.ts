import express from 'express';
import qs from 'qs';

import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';

const app = express();

app.set('query parser', (str: string) => 
  qs.parse(str)
);

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNotNumber(height) && !isNotNumber(weight)) {
      const result = calculateBmi(Number(height), Number(weight));
      res.json({
        height,
        weight,
        bmi: result
      });
  } else {
    res.json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});