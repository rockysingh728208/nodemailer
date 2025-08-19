

import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";
import { connectDb } from "./config/db.js";

dotenv.config();
const app = express();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, 
  },
});

app.use(cors());
app.use(express.json());

// ✅ Route
app.get("/", (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.TO_EMAIL,
    subject: "Sending email by tera sagar",
    text: "Tension mt lo sab axa hoga",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(" Error:", error);
      return res.status(500).send("Error sending email");
    } else {
      console.log("✅ Email sent:", info.response);
      return res.send("Email sent successfully!");
    }
  });
});

// ✅ Connect to DB
connectDb();

// ✅ Start server
app.listen(process.env.PORT, () => {
  console.log(` Server running on port ${process.env.PORT}`);
});
