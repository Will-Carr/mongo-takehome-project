import mongoose, { Document, isValidObjectId } from "mongoose";
import {
  Class,
  IScore,
  IStudent,
  Teacher,
} from "../models";
import { cleanDocument } from "../utils";

export const getTeacherTestResults = async (teacherId: string): Promise<{
  studentId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  scores: IScore[];
}[]> => {
  if (!isValidObjectId(teacherId)) {
    throw new Error(`Teacher ${teacherId} not found`);
  }

  // Get our teacher
  const teacher = await Teacher.findOne({ teacherId });
  if (!teacher) {
    throw new Error(`Teacher ${teacherId} not found`);
  }

  // Find the class they belong to, along with the students and scores
  const classDocument = await Class
    .findOne({ teacher: { _id: teacher._id } })
    .populate({
      path: 'students',

      populate: {
        path: 'scores',
      },
    });

  // Return data for each student
  const cleanedScores = (classDocument!.students as unknown as IStudent[]).map((student) => ({
    studentId: student.studentId,
    firstName: student.firstName,
    lastName: student.lastName,
    scores: (student.scores as unknown as Document<IScore>[]).map((score) => cleanDocument<IScore>(score)),
  }));
  return cleanedScores;
}