import Class from "../models/Class";

export const getClasses = async () => {
  // Return all the data we have
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
}