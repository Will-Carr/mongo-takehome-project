import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import seedData from './seeder/seedData';
// import { getSeededData } from './seeder/seedClasses';

const app = express();
const port = config.port;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/seed-data', async (req, res) => {
  const data = await seedData();
  res.send(data);
});

// app.get('/seed-data', async (req, res) => {
//   const data = await getSeededData();
//   res.send(data);
// });

app.listen(port, async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.mongoDbUrl);

  console.log(`Example app listening on port ${port}`);
});