import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import { Connection } from "./database/db.js";
import DefaultData from "./default.js";
import Router from "./routes/route.js";
import { handleServerError } from "./middleware/handleServerError.js";
import { seedCategories } from "./seeder/categorySeeder.js";

const app = express();
app.use(express.json());

app.use("/image", express.static("utils/uploads"));

dotenv.config();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/", Router);

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// console.log(USERNAME, PASSWORD);
Connection(USERNAME, PASSWORD);
seedCategories();

app.use(handleServerError);

app.listen(PORT, () => {
  console.log("Server started at port: ", PORT);
});

// DefaultData();
