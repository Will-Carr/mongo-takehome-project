import { Class, ITeacher, Teacher } from "../models";
import seedData from './data/teachers.json';

export const seedTeachers = async () => {
  const classes = await Class.find();
  const promises = seedData.map(async (teacher: Partial<ITeacher>, teacherIndex) => {
    const classDocument = classes[teacherIndex];
    teacher.classId = classDocument._id;
    const teacherDocument = new Teacher(teacher);

    classDocument.teacher = teacherDocument._id;

    await classDocument.save();
    await teacherDocument.save();
  });

  await Promise.allSettled(promises);
};
