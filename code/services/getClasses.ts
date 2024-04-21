import Class from "../models/Class";

export const getClasses = async () => {
  const classes = await Class.find();
  return classes;
}