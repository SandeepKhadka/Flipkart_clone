import { request, response } from "express";
import Product from "../model/product-schema.js";
import Joi from "joi";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { __dirname, upload, uploadFolder } from "../utils/multerConfig.js";
import mongoose from "mongoose";
import fs from "fs/promises";

const productSchema = Joi.object({
  url: Joi.string().uri(),
  image: Joi.string().required(),
  id: Joi.string().required(),
  detailUrl: Joi.string().uri(),
  title: Joi.object().keys({
    longTitle: Joi.string().min(3).required(),
    shortTitle: Joi.string().min(3).max(30).required(),
    // Add other validation rules for title fields if needed
  }),
  price: Joi.object().keys({
    cost: Joi.number().min(0).required(),
    mrp: Joi.number().min(0),
    discount: Joi.string(),
  }),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  quantity: Joi.number(),
  discount: Joi.string(),
  tagline: Joi.string(),
  description: Joi.string(),
});

export const getProducts = async (request, response) => {
  try {
    const products = await Product.find({});
    return response.status(200).send(products);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

export const getProductDetails = async (request, response) => {
  try {
    const id = request.params.id;
    const product = await Product.findOne({ id: id });
    return response.status(200).send(product);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

export const addProduct = (request, response, next) => {
  try {
    // Use multer to extract the image and store it in the 'uploads' folder
    upload.single("image")(request, response, async (err) => {
      if (err) {
        return response.status(400).json({ error: err });
      }

      const productId = uuidv4();
      let filename = "";

      if (request.file) {
        const productImage = path.join(uploadFolder, request.file.filename);
        filename = `http://localhost:8000/image/` + path.basename(productImage);
      }

      const products = {
        id: productId,
        title: {
          longTitle: request.body.longTitle,
          shortTitle: request.body.shortTitle,
        },
        category: request.body.category,
        subCategory: request.body.subCategory,
        description: request.body.description,
        price: {
          mrp: request.body.mrp,
          cost: request.body.cost,
          discount: request.body.discount,
        },
        quantity: request.body.quantity,
        tagline: request.body.tagline,
        image: filename,
      };

      // Validate the request body against the productSchema
      try {
        var validatedProduct = await productSchema.validateAsync(products, {
          abortEarly: false,
          stripUnknown: true,
        });
      } catch (error) {
        if (request.file) {
          const fetchingDeletingImage = path.basename(productImage);
          const deletingImage = path.join(
            __dirname,
            "../utils/uploads",
            fetchingDeletingImage
          );
          if (deletingImage) {
            await fs.unlink(deletingImage);
          }
        }
        // Handle any unexpected errors here
        // console.error("Error:", error);
        next(error);
        // response.status(500).json({ error: "An unexpected error occurred" });
      }

      // if (validatedProduct.error) {
      //   // If validation fails, delete the uploaded image and return an error response
      //   await fs.unlink(request.file.path);
      //   return response
      //     .status(400)
      //     .json({ error: validatedProduct.error.details });
      // }

      if (validatedProduct) {
        // Create a new product instance using the validated data
        const newProduct = new Product(validatedProduct);

        // Save the new product to the database
        await newProduct.save();

        response.status(200).json({ message: "Product saved successfully" });
      }
    });
  } catch (error) {
    // Handle any unexpected errors here
    // console.error("Error:", error);
    next(error);
    // response.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const updateProduct = async (request, response, next) => {
  try {
    upload.single("image")(request, response, async (err) => {
      if (err) {
        return response.status(400).json({ error: err });
      }

      let deletingImage = "";
      const id = new mongoose.Types.ObjectId(request.params.id);
      const updatedData = request.body;
      const product = await Product.findOne({ _id: id });
      if (request.file) {
        const productImage = path.join(uploadFolder, request.file.filename);
        const filename =
          `http://localhost:8000/image/` + path.basename(productImage);
        updatedData.image = filename;
        const fetchingDeletingImage = path.basename(product.image);
        deletingImage = path.join(
          __dirname,
          "../utils/uploads",
          fetchingDeletingImage
        );
      }

      const newUpdatedData = {
        ...updatedData,
        title: {
          longTitle: updatedData.longTitle,
          shortTitle: updatedData.shortTitle,
        },
        price: {
          mrp: updatedData.mrp,
          cost: updatedData.cost,
          discount: updatedData.discount,
        },
      };

      delete newUpdatedData.longTitle;
      delete newUpdatedData.shortTitle;
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id },
        newUpdatedData,
        { new: true }
      );

      try {
        var validatedProduct = await productSchema.validateAsync(
          newUpdatedData,
          {
            abortEarly: false,
            stripUnknown: true,
          }
        );
        if (validatedProduct) {
          if (deletingImage) {
            await fs.unlink(deletingImage);
          }
          return response.status(200).send(updatedProduct);
        } else {
          return response.status(404).send({ message: "Product not found" });
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

export const deleteProduct = async (request, response) => {
  try {
    upload.single("image")(request, response, async (err) => {
      if (err) {
        return response.status(400).json({ error: err });
      }

      const id = request.params.id;
      const product = await Product.findOne({ id: id });

      const fetchingDeletingImage = path.basename(product.image);
      const deletingImage = path.join(
        __dirname,
        "../utils/uploads",
        fetchingDeletingImage
      );
      const deletedProduct = await Product.findOneAndDelete({ id: id });

      if (deletedProduct) {
        if (deletingImage) {
          await fs.unlink(deletingImage);
          return response
            .status(200)
            .send({ message: "Product deleted successfully" });
        }
      } else {
        return response.status(404).send({ message: "Product not found" });
      }
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

export const filterProducts = async (request, response) => {
  try {
    const sort = request.query.sort; // Use query parameters for sort
    const maxPrice = request.query.maxPrice; // Use query parameters for maxPrice
    const minPrice = request.query.minPrice; // Use query parameters for minPrice
    const filter = request.query.filter; // Assuming filter is a comma-separated string, e.g., "value1,value2,value3"
    const filterArray = filter ? filter.split(",") : [];

    console.log(filterArray); // This will be an array, e.g., ["value1", "value2", "value3"]

    let query = Product.find({}); // Initialize the query

    if (filterArray.length > 0) {
      if (filterArray[0] == "All") {
        query = Product.find({});
      } else if (filterArray[1] == "") {
        query = query.where({ category: filterArray[0] });
      } else {
        query = query.where({ subCategory: filterArray[1] });
      }
    }
    // Apply filtering based on filter parameter

    // Apply filtering based on maxPrice and minPrice parameters
    if (maxPrice) {
      query = query.where("price.cost").lte(parseInt(maxPrice, 10));
    }
    if (minPrice) {
      query = query.where("price.cost").gte(parseInt(minPrice, 10));
    }

    // Apply sorting based on sort parameter
    if (sort === "price-high-to-low") {
      query = query.sort({ "price.cost": -1 }); // Sort high to low
    } else if (sort === "price-low-to-high") {
      query = query.sort({ "price.cost": 1 }); // Sort low to high
    }

    const sortedProducts = await query.exec(); // Execute the query

    return response.status(200).json(sortedProducts);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};
