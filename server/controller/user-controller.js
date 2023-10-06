import User from "../model/user-schema.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { sendEmail } from "../mail/mail_config.js";

const signupSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,30}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one capital letter, one digit, and one special character.",
      "any.required": "Password is required.",
    }),
  phone: Joi.string().alphanum().min(10).max(30),
  email: Joi.string().email().required(),
  // role: Joi.string().alphanum().valid(SELLER, BUYER).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  // role: Joi.string().alphanum().valid(SELLER, BUYER).required(),
});

const userSignup = async (request, response, next) => {
  try {
    const value = await signupSchema.validateAsync(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (value) {
      const emailExists = await User.findOne({ email: value.email });

      if (emailExists) {
        return response
          .status(400)
          .json({ error: [{ msg: "Email already exists", params: "email" }] });
      }

      const usernameExists = await User.findOne({ username: value.username });

      if (usernameExists) {
        return response.status(400).json({
          error: [{ msg: "Username already exists", params: "username" }],
        });
      }

      let hashedPassword = await bcrypt.hash(request.body.password, 10);
      const user = { ...request.body, password: hashedPassword };
      const newUser = new User(user);
      await newUser.save();

      // Send a welcome email to the user upon successful signup
      const recipientEmail = newUser.email;
      const emailSubject = "Welcome to Flipkart Clone";
      const emailText = "Thank you for signing up with Flipkart.";
      const emailHtml = "<p>Thank you for signing up with Flipkart.</p>";

      const emailSent = await sendEmail(
        recipientEmail,
        emailSubject,
        emailText,
        emailHtml
      );

      if (emailSent) {
        console.log("Welcome email sent successfully.");
      } else {
        console.error("Failed to send the welcome email.");
      }

      response.status(200).json({ message: user });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const userLogin = async (request, response, next) => {
  try {
    const { error } = await loginSchema.validateAsync(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return response.status(400).json(error.details);
    }

    const user = await User.findOne({ email: request.body.email });

    if (!user) {
      return response
        .status(401)
        .json({ error: [{ msg: "Invalid email", params: "email" }] });
    }

    const passwordMatch = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, "shhhhh");
      return response
        .status(200)
        .json({ data: user, message: "Login Successful", token: token });
    } else {
      return response.status(401).json({
        error: [
          {
            msg: "Password does not match with the given email",
            params: "password",
          },
        ],
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.userId);

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        error: [
          {
            msg: "User not found",
            params: "user",
          },
        ],
      });
    }

    return res.status(200).json({ data: user });
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

export default userSignup;
