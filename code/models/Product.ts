import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
