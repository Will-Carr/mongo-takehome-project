import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: mongoose.Types.ObjectId, ref: 'Teacher' },
  students: [{ type: mongoose.Types.ObjectId, default: [], ref: 'Student' }],
});

const Class = mongoose.model("Class", classSchema);
export default Class;
