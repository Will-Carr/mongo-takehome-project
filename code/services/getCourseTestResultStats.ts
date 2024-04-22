import { Document } from "mongoose";
import { Class, ITeacher } from "../models";
import { average } from "../utils";
import { getTeacherTestResultStats } from "./getTeacherTestResultStats";

export const getCourseTestResultStats = async () => {
  // Get all of our classes
  const classes = await Class.find().populate<{ teacher: Document<ITeacher> }>('teacher');

  const promises = classes.map(async (classDocument: any) => {
    const { name: className, teacher: { teacherId, firstName, lastName }} = classDocument;

    // Get the stats for each student within the class
    const teacherTestResultStats = await getTeacherTestResultStats(teacherId);

    // Get the average score of students for each course in the class
    const studentAveragesByCourse = teacherTestResultStats.reduce((acc, studentStats) => {
      const { stats } = studentStats;
      Object.entries(stats).forEach(([courseName, courseResults]) => {
        if (!acc[courseName]) {
          acc[courseName] = {
            average: courseResults.average,
            results: [courseResults.average],
          };
        } else {
          acc[courseName].results.push(courseResults.average);
          acc[courseName].average = average(acc[courseName].results);
        }
      });
      return acc;
    }, {});

    return {
      className,
      teacherId,
      teacherFirstName: firstName,
      teacherLastName: lastName,
      courses: studentAveragesByCourse,
    };
  });
  const results = await Promise.all(promises);
  return results;
}