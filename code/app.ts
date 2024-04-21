import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import seedData from './seeder/seedData';
import { getStudentTestResults } from './services/getStudentTestResults';

const app = express();
const port = config.port;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/seed-data', async (req, res) => {
  const data = await seedData();
  res.send(data);
});

app.get('/student-test-results', async (req, res) => {
  const { studentId }: { studentId?: string } = req.query;
  if (!studentId) {
    res.status(400).send('Must provide a studentId');
    return;
  }

  try {
    const results = await getStudentTestResults(studentId);
    res.send(results);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(port, async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.mongoDbUrl);

  console.log(`App listening on port ${port}`);
});