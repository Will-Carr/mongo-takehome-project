import Class, { IClass } from "../models/Class";
import seedData from './data/classes.json';

export const seedClasses = async () => {
  const promises = seedData.map(async (classRow: Partial<IClass>) => {
    const classDocument = new Class(classRow);
    await classDocument.save();
  });

  await Promise.allSettled(promises);
};
