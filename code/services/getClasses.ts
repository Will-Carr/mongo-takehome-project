import Class from "../models/Class";

export const getClasses = async () => {
  const classes = await Class.find()
    .populate('teacher')
    .populate({
      path: 'students',
      populate: {
        path: 'scores',
      },
    })
    .exec();
  return classes;
  return classes;
}