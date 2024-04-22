import mongoose from "mongoose";
import { average } from "../utils";
import { getTeacherTestResults } from "./getTeacherTestResults";

export const getTeacherTestResultStats = async (teacherId: string): Promise<{
  studentId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  stats: {
    [courseName: string]: {
      average: number;
      results: number[];
    }
  }
}[]> => {
  // Get the unprocessed test results
  const studentsResults = await getTeacherTestResults(teacherId);

  // For each of our students
  return studentsResults.map((studentResults) => {
    const { studentId, firstName, lastName, scores } = studentResults;

    // Get the stats for each course in the class
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