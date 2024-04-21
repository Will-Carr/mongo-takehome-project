import mongoose from "mongoose";
import Score from "./Score";

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

const Student = mongoose.model("Student", studentSchema);
export default Student;
