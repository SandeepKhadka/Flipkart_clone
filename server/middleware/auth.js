// import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import User from "../model/user-schema.js";
import mongoose from "mongoose";

export const checkAuthentication = (req, res, next) => {
  let loggedIn = false; // Initialize loggedIn as false
  let token = req.headers.authorization?.replace("Bearer ", "");

  try {
    jwt.verify(token, "shhhhh", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is invalid" });
      }

      req.userId = decoded.userId; // Customize this based on your token structure
      loggedIn = true; // Set loggedIn to true if the token is valid

      next();
    });
  } catch (err) {
    // Handle any errors if needed
    res.status(401).send({ msg: "unauthenticated" });
  }

  // You can check the value of loggedIn here and use it as needed
  if (!loggedIn) {
    return res.status(401).send({ msg: "unauthenticated" });
  }
};

export const isAdmin = async (res, req) => {
  const userId = new mongoose.Types.ObjectId(req.userId);

  try {
    const user = await User.findOne({ _id: userId });

    if (user.role == "admin") {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: [
        {
          msg: "Internal Server Error",
          params: "server",
        },
      ],
    });
  }
};
