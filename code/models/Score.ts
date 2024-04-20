import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  }, // TODO - immutable?
  examType: { type: String, enum: ['midterm', 'final'], required: true },
  classId: { type: mongoose.Types.ObjectId, required: true },
  score: { type: Number, min: 0, max: 100, required: true },
  date: { type: Date, required: true },
});

const Score = mongoose.model("Score", scoreSchema);
export default Score;
