// emailConfig.js

import nodemailer from "nodemailer";


// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  port: 465,
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "sandeepkhadka9827@gmail.com",
    pass: "ckmurkjgcmfhqfsd",
  },
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: "FLIPKART sandeepkhadka9827@gmail.com",
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};
