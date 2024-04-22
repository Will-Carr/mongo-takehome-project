import mongoose from "mongoose";

export interface IClass {
  name: string;
  teacher?: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
}

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: mongoose.Types.ObjectId, ref: 'Teacher' },
  students: [{ type: mongoose.Types.ObjectId, default: [], ref: 'Student' }],
});

export const Class = mongoose.model<IClass>("Class", classSchema);
