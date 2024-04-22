import {
  Class,
  Score,
  Student,
  Teacher,
} from "../models";
import { seedClasses } from "./seedClasses"
import { seedScores } from "./seedScores";
import { seedStudents } from "./seedStudents";
import { seedTeachers } from "./seedTeachers";


const seedData = async () => {
  // Purge existing data
  await Class.deleteMany();
  console.log('Deleted Classes');
  await Student.deleteMany();
  console.log('Deleted Students');
  await Teacher.deleteMany();
  console.log('Deleted Teachers');
  await Score.deleteMany();
  console.log('Deleted Scores');

  // Seed new data
  await seedClasses();
  console.log('Seeded Classes');
  await seedTeachers();
  console.log('Seeded Teachers');
  await seedStudents();
  console.log('Seeded Students');
  await seedScores();
  console.log('Seeded Scores');

  const classes = await Class.find()
    .populate('teacher')
    .populate({
      path: 'students',
      populate: {
        path: 'scores',
      },
    })
    .exec();
  return classes;
};

export default seedData;
