import { isValidObjectId } from "mongoose";
import Student from "../models/Student"
import { cleanDocument } from "../utils/cleanDocument";

export const getStudentTestResults = async (studentId: string) => {
  if (!isValidObjectId(studentId)) {
    throw new Error(`Student ${studentId} not found`);
  }

  const student = await Student.findOne({ studentId }).populate('scores');
  if (!student) {
    throw new Error(`Student ${studentId} not found`);
  }

  const cleanedScores = student.scores.map((score) => cleanDocument(score));
  return cleanedScores;
}