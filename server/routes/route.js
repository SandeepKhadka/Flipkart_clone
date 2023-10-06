import express from "express";
import userSignup, {
  getUser,
  userLogin,
} from "../controller/user-controller.js";
import {
  filterProducts,
  getProductDetails,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product-controller.js";
import { checkAuthentication } from "../middleware/auth.js";
import {
  getOrders,
  placeOrder,
  validateBillingData,
} from "../controller/order-controller.js";
import { getCategory } from "../controller/category-controller.js";

// import checkAuthentication from "../middleware/auth.js";

const router = express.Router();

//POST
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/addProduct", addProduct);
router.post("/order", placeOrder);
router.post("/validateBillingData", validateBillingData);

//GET
router.get("/product", getProducts);
router.get("/product/:id", getProductDetails);
// router.get("/admin", filterProducts);
router.get("/products", filterProducts);

router.get("/getOrders", getOrders);
router.get("/category", getCategory);

router.get("/getUser", checkAuthentication, getUser);

//PUT
router.put("/updateProduct/:id", updateProduct);

//DELETE
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
