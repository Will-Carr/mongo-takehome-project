import { Document, isValidObjectId } from "mongoose";
import { IScore, Student } from "../models";
import { cleanDocument } from "../utils";

export const getStudentTestResults = async (studentId: string) => {
  if (!isValidObjectId(studentId)) {
    throw new Error(`Student ${studentId} not found`);
  }

  // Get our student object with all the scores populated
  const student = await Student.findOne({ studentId }).populate<{ scores: Document<IScore>[] }>('scores');
  if (!student) {
    throw new Error(`Student ${studentId} not found`);
  }

  // Remove _id and __v from the response
  const cleanedScores = student.scores.map((score) => cleanDocument(score));
  return cleanedScores;
}