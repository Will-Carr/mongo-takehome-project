import { Document, isValidObjectId } from "mongoose";
import Score, { IScore } from "../models/Score";
import Student from "../models/Student"

export const patchTestResult = async (dataToUpdate: Partial<IScore>) => {
  const { examId } = dataToUpdate;
  if (!isValidObjectId(examId)) {
    throw new Error(`Exam ${examId} not found`);
  }

  const exam = await Score.findOne({ examId });
  if (!exam) {
    throw new Error(`Exam ${examId} not found`);
  }

  const currentExamData = exam.toObject();
  const newExamData: IScore = {
    ...currentExamData,
    ...dataToUpdate,
  };

  await validateNewData(newExamData);

  const { _id, __v, ...strippedData } = dataToUpdate as Document<IScore>;
  Object.entries(strippedData).forEach(([key, val]) => {
    exam[key] = val;
  })
  await exam.save();
  return newExamData;
};

// Make sure we're not duplicating data
const validateNewData = async (newExam: IScore) => {
  const { scores } = await Student
    .findOne({ _id: newExam.studentId })
    .populate('scores') as unknown as { scores: Document<IScore>[] };
  scores.forEach((score) => {
    if (JSON.stringify(score.toObject()) === JSON.stringify(newExam)) {
      throw new Error('Student already has a score with this exact data');
    }
  });
};
