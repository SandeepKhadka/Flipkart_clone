// categorySeeder.js
import mongoose from "mongoose";
import Category from "../model/category-schema.js";

// Define the categories to be seeded
const categoriesToSeed = [
  { name: "Top Offers", img: "top_offers.jpg" },
  { name: "Grocery", img: "grocery.jpg" },
  { name: "Mobile", img: "mobile.jpg" },
  { name: "Fashion", img: "fashion.jpg" },
  { name: "Electronics", img: "electronics.jpg" },
  { name: "Home", img: "home.jpg" },
  { name: "Appliances", img: "appliances.jpg" },
  { name: "Travel", img: "travel.jpg" },
  { name: "Beauty and Toys", img: "beauty_and_toys.jpg" },
];

// Function to seed categories
export const seedCategories = async () => {
  try {
    // Clear existing categories (optional, depending on your requirements)
    await Category.deleteMany({});

    // Seed new categories
    const createdCategories = await Category.insertMany(categoriesToSeed);

    console.log(
      "Categories seeding completed successfully:",
      // createdCategories
    );
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};

// Call the seedCategories function to start the seeding process
