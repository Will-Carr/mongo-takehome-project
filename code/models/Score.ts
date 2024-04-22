import mongoose from "mongoose";

export interface IScore {
  examId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  courseName: string;
  examType: 'midterm' | 'final';
  score: number;
  date: string;
}

const scoreSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  studentId: { type: mongoose.Types.ObjectId, required: true, ref: 'Student' },
  courseName: { type: String, required: true },
  examType: { type: String, enum: ['midterm', 'final'], required: true },
  score: { type: Number, min: 0, max: 100, required: true },
  date: { type: String, required: true },
});

export const Score = mongoose.model<IScore>("Score", scoreSchema);
