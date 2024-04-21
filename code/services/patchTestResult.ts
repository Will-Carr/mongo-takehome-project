import { isValidObjectId } from "mongoose";
import Score from "../models/Score";
import Student from "../models/Student"

export const patchTestResult = async (dataToUpdate: any) => {
  const { examId } = dataToUpdate;
  if (!isValidObjectId(examId)) {
    throw new Error(`Exam ${examId} not found`);
  }

  const exam = await Score.findOne({ examId });
  if (!exam) {
    throw new Error(`Exam ${examId} not found`);
  }

  const currentExamData = exam.toObject();
  const newExamData = {
    ...currentExamData,
    ...dataToUpdate,
  };

  await validateNewData(newExamData);

  const { _id, __v, ...strippedData } = dataToUpdate;
  Object.entries(strippedData).forEach(([key, val]) => {
    exam[key] = val;
  })
  await exam.save();
  return newExamData;
};

const validateNewData = async (newExam: any) => {
  const { scores }: any = await Student.findOne({ _id: newExam.studentId }).populate('scores');
  scores.forEach((score) => {
    if (JSON.stringify(score.toObject()) === JSON.stringify(newExam)) {
      throw new Error('Student already has a score with this exact data');
    }
  });
};
