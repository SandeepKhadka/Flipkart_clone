import Category from "../model/category-schema.js";

export const getCategory = async (request, response) => {
  try {
    const categories = await Category.find({});
    return response.status(200).send(categories);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};
