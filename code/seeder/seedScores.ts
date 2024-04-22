import mongoose from "mongoose";
import Score from "../models/Score";
import Student from "../models/Student";

export const seedScores = async () => {
  const students = await Student.find();
  const examTypes = ['midterm', 'final'];
  const examSubjects = ['English', 'Math', 'Science'];
  const promises = students.map(async (student) => {
    // 1-6 exams per student
    const numExams = Math.floor(Math.random() * 6) + 1;
    const examIds: mongoose.Types.ObjectId[] = [];
    for (let i = 0; i < numExams; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i - 5);
      const exam = {
        studentId: student._id,
        courseName: examSubjects[Math.floor(i / 2)],
        examType: examTypes[i % 2],
        score: Math.floor(Math.random() * 100),
        date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`, // YYYY-MM-DD
      };

      const scoreDocument = new Score(exam);
      examIds.push(scoreDocument._id);
      await scoreDocument.save();
    }

    student.scores = examIds;
    await student.save();
  });

  await Promise.allSettled(promises);
};
