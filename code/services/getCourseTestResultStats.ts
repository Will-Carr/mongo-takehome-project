import Class from "../models/Class";
import Teacher from "../models/Teacher";
import { getTeacherTestResults } from "./getTeacherTestResults";
import { getTeacherTestResultStats } from "./getTeacherTestResultStats";

const average = (scores: number[]) => scores.reduce((a, b) => a + b) / scores.length;
export const getCourseTestResultStats = async () => {
  const classes = await Class.find().populate('teacher');
  const promises = classes.map(async (classDocument: any) => {
    const { name: className, teacher: { teacherId, firstName, lastName }} = classDocument;
    const teacherTestResultStats = await getTeacherTestResultStats(teacherId);
    const studentAveragesByCourse = teacherTestResultStats.reduce((acc, studentStats) => {
      const { stats } = studentStats;
      Object.entries(stats).forEach(([courseName, courseResults]: any[]) => {
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
      ...studentAveragesByCourse,
    };
  });
  const results = await Promise.all(promises);
  console.log(results)
  return results;
}