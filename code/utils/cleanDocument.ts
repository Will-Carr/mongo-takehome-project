import { Document } from "mongoose";

export const cleanDocument = (document: Document) => {
  const { _id, __v, ...rest } = document.toObject();
  return rest;
};
