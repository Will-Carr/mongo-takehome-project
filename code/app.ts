import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import seedData from './seeder/seedData';
import { getClasses } from './services/getClasses';
import { getCourseTestResultStats } from './services/getCourseTestResultStats';
import { getStudent } from './services/getStudent';
import { getStudentTestResults } from './services/getStudentTestResults';
import { getTeacherTestResults } from './services/getTeacherTestResults';
import { getTeacherTestResultStats } from './services/getTeacherTestResultStats';
import { moveStudentsToNewClass } from './services/moveStudentsToNewClass';
import { patchTestResult } from './services/patchTestResult';

const app = express();
app.use(express.json());
const port = config.port;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Seeds data into the database
app.post('/seed-data', async (req, res) => {
  const data = await seedData();
  res.send(data);
});

// Debug only, gets the raw database data for a student
app.get('/student', async (req, res) => {
  const { studentId }: { studentId?: string } = req.query;
  if (!studentId) {
    res.status(400).send('Must provide a studentId');
    return;
  }

  try {
    const results = await getStudent(studentId);
    res.send(results);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Debug only, gets the raw database data for all classes, with teachers, students, and scores joined in.
app.get('/classes', async (req, res) => {
  try {
    const results = await getClasses();
    res.send(results);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get test results for one student
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

// Get test results for all students across one teacher
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

// Get test result stats for all students across one teacher
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

// Get test result stats for all students across all classes
app.get('/course-test-result-stats', async (req, res) => {
  try {
    const results = await getCourseTestResultStats();
    res.send(results);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a single test result. Only examId is required in the body, and can optionally pass studentId, courseName, examType, score, date.
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

// Move a list of students to a new class. Required body: studentIds, newClassName.
app.post('/move-students-to-new-class', async (req, res) => {
  if (!req.body) {
    res.status(400).send('Must provide a body in the request');
    return;
  }
  if (!req.body.studentIds) {
    res.status(400).send('Must provide studentIds in the request body');
    return;
  }
  if (!req.body.newClassName) {
    res.status(400).send('Must provide newClassName in the request body');
    return;
  }
  try {
    const results = await moveStudentsToNewClass(req.body.studentIds, req.body.newClassName);
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