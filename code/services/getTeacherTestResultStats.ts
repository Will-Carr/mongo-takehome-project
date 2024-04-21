import { getTeacherTestResults } from "./getTeacherTestResults";

const average = (scores: number[]) => scores.reduce((a, b) => a + b) / scores.length;
export const getTeacherTestResultStats = async (teacherId: string) => {
  const teacherTestResults: any[] = await getTeacherTestResults(teacherId);

  return teacherTestResults.map((studentResults) => {
    const { studentId, firstName, lastName, scores } = studentResults;
    const stats = scores.reduce((acc, exam) => {
      const { courseName, score } = exam;

      if (!acc[courseName]) {
        acc[courseName] = {
          average: score,
          results: [score],
        };
      } else {
        acc[courseName].results.push(score);
        acc[courseName].average = average(acc[courseName].results);
      }

      return acc;
    }, {});

    return {
      studentId,
      firstName,
      lastName,
      stats,
    }
  });
}