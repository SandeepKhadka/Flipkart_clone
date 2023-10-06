import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import Order from "../model/order-schema.js";
import { request, response } from "express";

const orderSchema = Joi.object({
  oid: Joi.string().required(),
  orderNo: Joi.string().required(),
  totalAmount: Joi.number().required(),
  sub_total: Joi.number().required(),
  discount: Joi.number(),
  deliveryCharge: Joi.number(),
  paymentMethod: Joi.string().valid("cashOnDelivery", "esewa").required(),
  paymentStatus: Joi.string().valid("Paid", "Unpaid").required(),
  firstname: Joi.string().required().min(2).max(20),
  lastname: Joi.string().required().min(2).max(20),
  middlename: Joi.string().required().trim().lowercase().min(2).max(20),
  email: Joi.string().required().trim().lowercase().email(),
  phone: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  streetNo: Joi.string(),
  postalcode: Joi.string(),
  sfirstname: Joi.string().required().min(2).max(20),
  slastname: Joi.string().required().min(2).max(20),
  smiddlename: Joi.string().required().trim().lowercase().min(2).max(20),
  semail: Joi.string().required().trim().lowercase().email(),
  sphone: Joi.string().required(),
  sstate: Joi.string().required(),
  scity: Joi.string().required(),
  sstreetNo: Joi.string(),
  spostalcode: Joi.string(),
});

const billingSchema = Joi.object({
  firstname: Joi.string().required().min(2).max(20),
  lastname: Joi.string().required().min(2).max(20),
  middlename: Joi.string().required().trim().lowercase().min(2).max(20),
  email: Joi.string().required().trim().lowercase().email(),
  phone: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  streetNo: Joi.string(),
  postalcode: Joi.string(),
  sfirstname: Joi.string().required().min(2).max(20),
  slastname: Joi.string().required().min(2).max(20),
  smiddlename: Joi.string().required().trim().lowercase().min(2).max(20),
  semail: Joi.string().required().trim().lowercase().email(),
  sphone: Joi.string().required(),
  sstate: Joi.string().required(),
  scity: Joi.string().required(),
  sstreetNo: Joi.string(),
  spostalcode: Joi.string(),
});

export const validateBillingData = async (request, response, next) => {
  try {
    var validatedOrder = await billingSchema.validateAsync(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    next(error);
  }
  if (validatedOrder) {
    response.status(200).json({ message: "Validation Successfull" });
  }
};

export const placeOrder = async (request, response, next) => {
  try {
    // console.log(request.body);
    const oid = uuidv4();
    // const orderNo = `0RD-${uuidv4()}`;
    const orderNo = `ORD-${oid.substring(0, 5)}`;
    const order = {
      oid: oid,
      orderNo: orderNo,
      ...request.body,
    };
    console.log(order);
    try {
      var validatedOrder = await orderSchema.validateAsync(order, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (error) {
      next(error);
    }

    if (validatedOrder) {
      // Create a new product instance using the validated data
      const newOrder = new Order(validatedOrder);

      // Save the new product to the database
      await newOrder.save();

      response.status(200).json({ message: "Order saved successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (request, response) => {
  try {
    const orders = await Order.find({});
    return response.status(200).send(orders);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};
