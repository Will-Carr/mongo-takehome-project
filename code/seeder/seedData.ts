import Class from "../models/Class";
import Student from "../models/Student";
import Teacher from "../models/Teacher";
import { seedClasses } from "./seedClasses"
import { seedStudents } from "./seedStudents";
import { seedTeachers } from "./seedTeachers";


const seedData = async () => {
  await Class.deleteMany();
  console.log('Deleted Classes');
  await Student.deleteMany();
  console.log('Deleted Students');
  await Teacher.deleteMany();
  console.log('Deleted Teachers');
  const classes = await seedClasses();
  console.log('Seeded Classes');
  const teachers = await seedTeachers();
  console.log('Seeded Teachers');
  const students = await seedStudents();
  console.log('Seeded Students');
  return [...classes, ...teachers, ...students];
};

export default seedData;
