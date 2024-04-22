import mongoose from "mongoose";

export interface ITeacher {
  teacherId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  classId: mongoose.Types.ObjectId;
}

const teacherSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  classId: { type: mongoose.Types.ObjectId, required: true, ref: 'Class' },
});

const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);
export default Teacher;
