import Class from "../models/Class";
import Teacher from "../models/Teacher";
import seedData from './data/teachers.json';

export const seedTeachers = async () => {
  const classes = await Class.find();
  const numberOfTeachers = seedData.length;
  const promises = seedData.map(async (teacher: any, teacherIndex) => {
    const nthClasses = classes.filter((_, classIndex) => {
      return (classIndex - teacherIndex) % numberOfTeachers === 0;
    });
    const classIds = nthClasses.map((classRow) => classRow.classId);
    teacher.classIds = classIds;
    const teacherDocument = new Teacher(teacher);
    await teacherDocument.save();
  });

  // TODO - error handling?
  await Promise.allSettled(promises);

  return Teacher.find();
};
