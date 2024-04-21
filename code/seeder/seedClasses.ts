import Class from "../models/Class";
import seedData from './data/classes.json';

export const seedClasses = async () => {
  const promises = seedData.map(async (classRow) => {
    const classDocument = new Class(classRow);
    await classDocument.save();
  });

  await Promise.allSettled(promises);
};

// export const getSeededData = async () => {
//   const products = await Class.find();
//   return products;
// }
