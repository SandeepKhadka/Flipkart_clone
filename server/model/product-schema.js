import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
  },
  image: {
    type: String,
  },
  detailUrl: {
    type: String,
  },
  title: {
    type: Object,
  },
  price: {
    type: Object,
    cost: {
      type: Number,
    },
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  discount: {
    type: String,
  },
  tagline: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Product = mongoose.model("product", productSchema);

export default Product;
