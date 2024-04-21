import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import seedData from './seeder/seedData';
import { getCourseTestResultStats } from './services/getCourseTestResultStats';
import { getStudentTestResults } from './services/getStudentTestResults';
import { getTeacherTestResults } from './services/getTeacherTestResults';
import { getTeacherTestResultStats } from './services/getTeacherTestResultStats';
import { patchTestResult } from './services/patchTestResult';

const app = express();
app.use(express.json());
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

app.get('/teacher-test-results', async (req, res) => {
  const { teacherId }: { teacherId?: string } = req.query;
  if (!teacherId) {
    res.status(400).send('Must provide a teacherId');
    return;
  }

  try {
    const results = await getTeacherTestResults(teacherId);
    res.send(results);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get('/teacher-test-result-stats', async (req, res) => {
  const { teacherId }: { teacherId?: string } = req.query;
  if (!teacherId) {
    res.status(400).send('Must provide a teacherId');
    return;
  }

  try {
    const results = await getTeacherTestResultStats(teacherId);
    res.send(results);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get('/course-test-result-stats', async (req, res) => {
  try {
    const results = await getCourseTestResultStats();
    res.send(results);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.patch('/test-result', async (req, res) => {
  if (!req.body) {
    res.status(400).send('Must provide a body in the request');
    return;
  }
  if (!req.body.examId) {
    res.status(400).send('Must provide an examId in the request body');
    return;
  }
  try {
    const results = await patchTestResult(req.body);
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