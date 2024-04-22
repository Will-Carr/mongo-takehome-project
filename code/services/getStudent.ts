import { isValidObjectId } from "mongoose";
import { Student } from "../models"

export const getStudent = async (studentId: string) => {
  if (!isValidObjectId(studentId)) {
    throw new Error(`Student ${studentId} not found`);
  }

  const student = await Student.findOne({ studentId });
  if (!student) {
    throw new Error(`Student ${studentId} not found`);
  }

  return student;
}