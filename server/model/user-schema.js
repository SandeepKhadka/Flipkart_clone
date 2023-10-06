import mongoose from "mongoose";
// import { ADMIN, BUYER, SELLER } from "../constants/role";
// import * as role from "../constants/role";

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 20,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 20,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowecase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowecase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "buyer",
    set: function (value) {
      return value.toLowerCase();
    },
    // enum: [role.SELLER, role.BUYER, role.ADMIN],
    enum: ["seller", "buyer", "admin"],
    required: true,
  },
});

const user = mongoose.model("user", userSchema);

export default user;
