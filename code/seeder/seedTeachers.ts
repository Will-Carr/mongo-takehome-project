import Class from "../models/Class";
import Teacher from "../models/Teacher";
import seedData from './data/teachers.json';

export const seedTeachers = async () => {
  const classes = await Class.find();
  const promises = seedData.map(async (teacher: any, teacherIndex) => {
    // todo figure out this typing
    const classDocument = classes[teacherIndex] as any;
    teacher.classId = classDocument._id;
    const teacherDocument = new Teacher(teacher);

    classDocument.teacher = teacherDocument._id;

    await classDocument.save();
    await teacherDocument.save();
  });

  await Promise.allSettled(promises);
};
