import { products } from "./constants/data.js";
import Product from "./model/product-schema.js";

const DefaultData = async () => {
  try {
    const storeProduct = await Product.insertMany(products);
    if (storeProduct) {
      console.log("Product stored successfully");
    }
  } catch (err) {
    console.log("Error while inserting default data ", err.message);
  }
};

export default DefaultData;
