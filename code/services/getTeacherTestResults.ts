import { isValidObjectId } from "mongoose";
import Class from "../models/Class";
import Student from "../models/Student"
import Teacher from "../models/Teacher";
import { cleanDocument } from "../utils/cleanDocument";

export const getTeacherTestResults = async (teacherId: string) => {
  if (!isValidObjectId(teacherId)) {
    throw new Error(`Teacher ${teacherId} not found`);
  }

  const teacher: any = await Teacher.findOne({ teacherId });
  if (!teacher) {
    throw new Error(`Teacher ${teacherId} not found`);
  }

  const classDocument: any = await Class
    .findOne({ teacher: { _id: teacher._id } })
    .populate({
      path: 'students',
      populate: {
        path: 'scores',
      },
    });

  const cleanedScores = classDocument.students.map((student) => ({
    studentId: student.studentId,
    firstName: student.firstName,
    lastName: student.lastName,
    scores: student.scores.map((score) => cleanDocument(score)),
  }));
  return cleanedScores;
}