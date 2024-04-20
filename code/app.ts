import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import seedData from './seeder/seedData';
import { getSeededData } from './seeder/seedProducts';

const app = express();
const port = config.port;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/seed-data', async (req, res) => {
  await seedData();
  res.send('Seeded data');
});

app.get('/seed-data', async (req, res) => {
  const data = await getSeededData();
  res.send(data);
});

app.listen(port, async () => {
  mongoose.set("strictQuery", false);
  const mongoDB = "mongodb://127.0.0.1/my_database";
  await mongoose.connect(mongoDB);

  console.log(`Example app listening on port ${port}`);
});