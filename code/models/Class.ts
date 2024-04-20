import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  }, // TODO - immutable?
  name: { type: String, required: true },
  teacherId: { type: mongoose.Types.ObjectId },
  studentIds: { type: [mongoose.Types.ObjectId], default: [] },
});

const Class = mongoose.model("Class", classSchema);
export default Class;
