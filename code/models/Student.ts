import mongoose from "mongoose";

export interface IStudent {
  studentId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  classId: mongoose.Types.ObjectId;
  scores: mongoose.Types.ObjectId[];
}

const studentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  classId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Class',
  },
  scores: [{ type: mongoose.Types.ObjectId, default: [], ref: 'Score' }],
});

export const Student = mongoose.model<IStudent>("Student", studentSchema);
