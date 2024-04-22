import { Document } from "mongoose";

export const cleanDocument = <T>(document: Document<T>): T => {
  const { _id, __v, ...rest } = document.toObject();
  return rest;
};
