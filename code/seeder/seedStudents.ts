import Class from "../models/Class";
import Student from "../models/Student";
import seedData from './data/students.json';

export const seedStudents = async () => {
  const classes = await Class.find();
  const promises = seedData.map(async (student: any) => {
    student.classIds = [];
    for (const classRow of classes) {
      if (Math.random() > 0.5) {
        student.classIds.push(classRow.classId);
      }
    }
    const studentDocument = new Student(student);
    await studentDocument.save();
  });

  // TODO - error handling?
  await Promise.allSettled(promises);

  return Student.find();
};
