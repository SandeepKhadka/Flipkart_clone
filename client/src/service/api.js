import axios from "axios";

const URL = "http://localhost:8000";

export const authenticateSignup = async (data) => {
  try {
    return await axios.post(`${URL}/signup`, data);
  } catch (error) {
    console.log("Error while calling signup api ", error);
    return await error;
  }
};

export const authenticateLogin = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data);
  } catch (error) {
    console.log("Error while calling login api ", error);
    return await error;
  }
};

export const storeOrderData = async (data) => {
  try {
    return await axios.post(`${URL}/order`, data);
  } catch (error) {
    console.log("Error while calling login api ", error);
    return await error;
  }
};

export const validateBillingData = async (data) => {
  try {
    return await axios.post(`${URL}/validateBillingData`, data);
  } catch (error) {
    console.log("Error while calling login api ", error);
    return await error;
  }
};

export const getAllOrders = async () => {
  try {
    return await axios.get(`${URL}/getOrders`);
  } catch (error) {
    console.log("Error while calling login api ", error);
    return await error;
  }
};

export const getAllCategory = async () => {
  try {
    return await axios.get(`${URL}/category`);
  } catch (error) {
    console.log("Error while calling login api ", error);
    return await error;
  }
};
