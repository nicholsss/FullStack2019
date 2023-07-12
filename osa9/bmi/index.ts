import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
  const height = Number((req.query.height));
  const weight = Number((req.query.weight));
  const bmi = calculateBmi(height,weight);
  const result ={
    weight,
    height,
    bmi
  };
  res.json(result);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'Parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || !daily_exercises.every((day) => typeof day === 'number')) {
    return res.status(400).json({ error: 'Malformatted parameters' });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(target, daily_exercises);
    console.log('Sending response:', result);
    return res.json(result);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return res.status(400).json({ error: error.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});