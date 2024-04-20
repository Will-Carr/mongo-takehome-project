import mongoose from "mongoose";
import Score from "./Score";

const studentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  }, // TODO - immutable?
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  classIds: { type: [mongoose.Types.ObjectId], required: true },
  // scores: { type: [Score], required: true },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
