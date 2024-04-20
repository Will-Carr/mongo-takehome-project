import Product from "../models/Product";
import mongoose from "mongoose";
import config from "../config";

//create your array. i inserted only 1 object here
const products = [   
  new Product({
    image:
      "https://static.seattletimes.com/wp-content/uploads/2018/01/a8e801dc-f665-11e7-bf8f-ddd02ba4a187-780x1181.jpg",
    title: "Origin",
    author: "Dan Brown",
    description:
      "2017 mystery thriller novel. Dan Brown is back with another thriller so moronic you can feel your IQ points flaking away like dandruff",
    price: 12
  }),]

export const seedProducts = async () => {
  mongoose
    .connect(String(config.mongoDbUrl))
    .catch(err => {
      console.log(err.stack);
      process.exit(1);
    })
    .then(() => {
      console.log("connected to db in development environment");
    });

  products.forEach(async (product, index) => {
    const returnedProduct = await product.save();
    console.log(returnedProduct);
    if (index === products.length - 1) {
      console.log('done');
    }
  });
};

export const getSeededData = async () => {
  mongoose
    .connect(String(config.mongoDbUrl))
    .catch(err => {
      console.log(err.stack);
      process.exit(1);
    })
    .then(() => {
      console.log("connected to db in development environment");
    });

  const products = await Product.find();
  return products;
}
