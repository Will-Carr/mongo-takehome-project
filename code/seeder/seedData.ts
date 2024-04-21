import Class from "../models/Class";
import Student from "../models/Student";
import Teacher from "../models/Teacher";
import { seedClasses } from "./seedClasses"
import { seedScores } from "./seedScores";
import { seedStudents } from "./seedStudents";
import { seedTeachers } from "./seedTeachers";


const seedData = async () => {
  await Class.deleteMany();
  console.log('Deleted Classes');
  await Student.deleteMany();
  console.log('Deleted Students');
  await Teacher.deleteMany();
  console.log('Deleted Teachers');
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
