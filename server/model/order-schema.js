import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  oid: {
    type: String,
    required: true,
    unique: true,
  },
  orderNo: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  sub_total: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  deliveryCharge: {
    type: Number,
  },
  paymentMethod: {
    type: String,
    default: "cashOnDelivery",
    // set: function (value) {
    //   return value.toLowerCase();
    // },
    // enum: [role.SELLER, role.BUYER, role.ADMIN],
    enum: ["cashOnDelivery", "esewa"],
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "Unpaid",
    // set: function (value) {
    //   return value.toLowerCase();
    // },
    // enum: [role.SELLER, role.BUYER, role.ADMIN],
    enum: ["Paid", "Unpaid"],
    required: true,
  },
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
  middlename: {
    type: String,
    required: true,
    trim: true,
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
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  streetNo: {
    type: String,
  },
  postalcode: {
    type: String,
  },
  sfirstname: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 20,
  },
  slastname: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 20,
  },
  smiddlename: {
    type: String,
    required: true,
    trim: true,
    index: true,
    lowecase: true,
  },
  semail: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowecase: true,
  },
  sphone: {
    type: String,
    required: true,
  },
  sstate: {
    type: String,
    required: true,
  },
  scity: {
    type: String,
    required: true,
  },
  sstreetNo: {
    type: String,
  },
  spostalcode: {
    type: String,
  },
});

const Order = mongoose.model("order", orderSchema);

export default Order;
