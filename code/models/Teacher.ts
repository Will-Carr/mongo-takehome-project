import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  }, // TODO - immutable?
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  classIds: { type: [mongoose.Types.ObjectId], required: true },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
