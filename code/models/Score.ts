import mongoose from "mongoose";

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
  // todo validator
  date: { type: String, required: true },
});

const Score = mongoose.model("Score", scoreSchema);
export default Score;
