import Class from "../models/Class";
import Student, { IStudent } from "../models/Student";
import seedData from './data/students.json';

export const seedStudents = async () => {
  const classes = await Class.find();
  const studentsByClass = {};
  classes.forEach((classDoc) => studentsByClass[classDoc._id.toString()] = []);

  const promises = seedData.map(async (student: Partial<IStudent>, index) => {
    const classDocument = classes[index % classes.length];
    student.classId = classDocument._id;
    const studentDocument = new Student(student);

    studentsByClass[classDocument._id.toString()].push(studentDocument._id);
  
    await studentDocument.save();
  });

  await Promise.allSettled(promises);

  const classPromises = classes.map(async (classDocument) => {
    classDocument.students = studentsByClass[classDocument._id.toString()];
    await classDocument.save();
  });
  await Promise.allSettled(classPromises);
};
