import mongoose from "mongoose";
// import { ADMIN, BUYER, SELLER } from "../constants/role";
// import * as role from "../constants/role";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  img:{
    type: String
  },
  status: {
    type: String,
    default: "active",
    set: function (value) {
      return value.toLowerCase();
    },
    enum: ["active", "inactive"],
    required: true,
  },
});

const Category = mongoose.model("category", categorySchema);

export default Category;
