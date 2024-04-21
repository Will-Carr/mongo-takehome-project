# mongo-takehome-project
# Requirements
- MongoDB installed locally
- Node 20

# Running
To install, `npm i`.
To run, `npm run build && npm start`.
By default, this loads on port 3000

# Endpoints
- POST /seed-data
  - Seeds data into the database
- GET /student?studentId=[STUDENT_ID]
  - Debug only, gets the raw database data for a student
- GET /classes
  - Debug only, gets the raw database data for all classes, with teachers, students, and scores joined in.
- GET /student-test-results?studentId=[STUDENT_ID]
  - Get test results for one student
- GET /teacher-test-results?teacherId=[TEACHER_ID]
  - Get test results for all students across one teacher
- GET /teacher-test-result-stats?teacherId=[TEACHER_ID]
  - Get test result stats for all students across one teacher
- GET /course-test-result-stats
  - Get test result stats for all students across all classes
- PATCH /test-result
  - Update a single test result. Only examId is required in the body, and can optionally pass studentId, courseName, examType, score, date.
- POST /move-students-to-new-class
  - Move a list of students to a new class. Required body: studentIds, newClassName.
