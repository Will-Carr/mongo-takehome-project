import { isValidObjectId } from "mongoose";
import Class from "../models/Class";
import Student from "../models/Student"

export const moveStudentsToNewClass = async (studentIds: string, newClassName: string) => {
  const results: {
    skippedStudents: string[];
    successfullyMoved: string[];
  } = {
    skippedStudents: [],
    successfullyMoved: [],
  }
  for (const studentId of studentIds) {
    if (!isValidObjectId(studentId)) {
      console.log(`Cannot find student ${studentId}`);
      results.skippedStudents.push(studentId);
      continue;
    }
    const student = await Student.findOne({ studentId });

    if (!student) {
      console.log(`Cannot find student ${studentId}`);
      results.skippedStudents.push(studentId);
      continue;
    }

    const { classId: currentClassId } = student;
    const currentClass = (await Class.findOne({ _id: currentClassId }))!;
    if (newClassName === currentClass.name) {
      console.log(`Student ${studentId} already belongs to class ${newClassName}`);
      results.skippedStudents.push(studentId);
      continue;
    }

    const newClass = await Class.findOne({ name: newClassName });
    if (!newClass) {
      console.log(`Cannot find new class ${newClassName}`);
      results.skippedStudents.push(studentId);
      continue;
    }

    student.classId = newClass._id;
    currentClass.students = currentClass.students.filter((classStudentId) => classStudentId.toString() !== student._id.toString());
    newClass.students.push(student._id);

    await student.save();
    await currentClass.save();
    await newClass.save();
    results.successfullyMoved.push(studentId);
  }

  return results;
}